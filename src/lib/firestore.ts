'use client';

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  type DocumentData,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseClient } from './firebase';
import { COLLECTIONS } from './firestore-types';

function getDb() {
  const fb = getFirebaseClient();
  return fb?.db ?? null;
}

function snapshotToData<T>(id: string, data: DocumentData): T {
  const d = { ...data, id };
  // Firestore Timestamp -> ISO string
  Object.keys(d).forEach((k) => {
    if (d[k] && typeof d[k].toDate === 'function') d[k] = d[k].toDate().toISOString();
  });
  return d as T;
}

export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, collectionName));
  const list = snap.docs.map((d) => snapshotToData<T>(d.id, d.data()));
  return list.sort((a: { order?: number }, b: { order?: number }) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getCollectionUnordered<T>(collectionName: string): Promise<T[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map((d) => snapshotToData<T>(d.id, d.data()));
}

export async function getDocument<T>(collectionName: string, docId: string): Promise<T | null> {
  const db = getDb();
  const ref = doc(db, collectionName, docId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snapshotToData<T>(snap.id, snap.data());
}

export async function setDocument(collectionName: string, docId: string, data: DocumentData): Promise<void> {
  const db = getDb();
  const ref = doc(db, collectionName, docId);
  await setDoc(ref, data, { merge: true });
}

export async function addDocument(collectionName: string, data: DocumentData): Promise<string> {
  const db = getDb();
  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function updateDocument(collectionName: string, docId: string, data: Partial<DocumentData>): Promise<void> {
  const db = getDb();
  const ref = doc(db, collectionName, docId);
  await updateDoc(ref, data);
}

export async function removeDocument(collectionName: string, docId: string): Promise<void> {
  const db = getDb();
  const ref = doc(db, collectionName, docId);
  await deleteDoc(ref);
}

// Helpers that strip undefined and convert dates for Firestore
export function toFirestore<T extends Record<string, unknown>>(obj: T): DocumentData {
  const out: DocumentData = {};
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined) return;
    if (k === 'id') return;
    if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)) {
      out[k] = Timestamp.fromDate(new Date(v));
      return;
    }
    out[k] = v;
  });
  return out;
}

export { COLLECTIONS };
