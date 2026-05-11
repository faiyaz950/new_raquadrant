'use client';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirebaseClient } from '@/lib/firebase';

const ACCEPTED_TYPES = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg'];
const MAX_SIZE_MB = 5;
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 0.82;

export function isAcceptedImageFile(file: File): boolean {
  const type = file.type?.toLowerCase();
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!type || !ext) return false;
  if (ACCEPTED_TYPES.includes(type)) return true;
  if (['png', 'webp', 'jpg', 'jpeg'].includes(ext)) return true;
  return false;
}

export function validateImageFile(file: File): string | null {
  if (!isAcceptedImageFile(file)) {
    return 'Only PNG, WebP, JPG, JPEG allowed.';
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `File must be under ${MAX_SIZE_MB}MB.`;
  }
  return null;
}

/**
 * Resize/compress image in browser to reduce upload size. Max width 1920px, JPEG quality 0.82.
 */
function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const scale = w > MAX_WIDTH ? MAX_WIDTH / w : 1;
      const cw = Math.round(w * scale);
      const ch = Math.round(h * scale);
      const canvas = document.createElement('canvas');
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, cw, ch);
      const isJpeg = /jpe?g/i.test(file.type);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : resolve(file)),
        isJpeg ? 'image/jpeg' : file.type,
        isJpeg ? JPEG_QUALITY : 0.9
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
}

/**
 * Upload image to Firebase Storage and return public download URL.
 * Compresses image first to speed up upload. Supports progress callback.
 */
export async function uploadImage(
  file: File,
  folder: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const fb = getFirebaseClient();
  if (!fb?.storage) throw new Error('Firebase Storage not configured');
  const err = validateImageFile(file);
  if (err) throw new Error(err);

  onProgress?.(5);
  const blob = await compressImage(file);
  onProgress?.(15);

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const mime = /png|webp|jpeg|jpg/.test(ext) ? (ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg') : 'image/jpeg';
  const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${Date.now()}_${sanitized}`;
  const storageRef = ref(fb.storage, path);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, blob, { contentType: mime });
    task.on(
      'state_changed',
      (snap) => {
        const total = snap.totalBytes || 1;
        const p = snap.bytesTransferred / total;
        onProgress?.(15 + Math.round(p * 80));
      },
      (err: Error & { code?: string }) => {
        const code = err?.code;
        const msg = err?.message ?? String(err);
        if (
          code === 'storage/unauthorized' ||
          code === 'storage/permission-denied' ||
          msg.includes('permission') ||
          msg.includes('Permission')
        ) {
          const signedIn = !!getFirebaseClient()?.auth?.currentUser;
          reject(
            new Error(
              signedIn
                ? 'Storage rejected this upload (Firebase rules). Vercel/hosting only deploys the website — rules live in Firebase. Run `firebase deploy --only storage` from the repo, or Firebase Console → Storage → Rules → paste `storage.rules` → Publish. Same project as your NEXT_PUBLIC_FIREBASE_* env vars. Allowed folders: hero-slides, about-hero-slides, intro-images, testimonials, partners, project-images.'
                : 'Sign in to Admin first (Storage writes require an authenticated user), then try the upload again.'
            )
          );
        } else {
          reject(err);
        }
      },
      async () => {
        onProgress?.(100);
        const url = await getDownloadURL(storageRef);
        resolve(url);
      }
    );
  });
}

export async function uploadHeroSlideImage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  return uploadImage(file, 'hero-slides', onProgress);
}
