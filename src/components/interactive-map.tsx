
"use client"

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// A simplified SVG path data for India map for demonstration
// In a real scenario, you might use a more detailed SVG or a library
const states = [
  { id: 'up', name: 'Uttar Pradesh', path: "M426,178l-4,10l-1,-11l-10,-5l-9,-12l-12,-1l1,-14l10,-6l17,2l8,12l0,15Z" },
  { id: 'br', name: 'Bihar', path: "M471,179l-4,-14l-11,-2l-13,6l-10,4l-4,11l-3,11l20,-2l12,-1l13,-5l0,-10Z" },
  { id: 'jh', name: 'Jharkhand', path: "M472,219l-4,-13l-16,-3l-13,5l-11,2l-8,12l10,9l18,2l10,-5l14,-7Z" },
  // Other states for context
  { id: 'others', name: 'India', path: "M216,118l-12,3l-10,12l-14,3l-12,8l-14,24l-12,8l-11,20l-1,14l-12,28l-8,14l-2,30l13,11l10,21l16,21l18,5l27,2l10,-7l20,5l24,20l3,12l15,13l13,-4l17,6l14,23l16,-3l4,-15l15,-10l12,5l16,-11l6,-13l24,-13l-4,-19l-13,-12l-14,-22l-10,-10l-2,-12l-19,-14l-15,3l-12,-7l-15,-20l-10,-11l-11,-26l-20,-11l-12,-16l-22,-3l-20,7l-16,15l-13,4l-13,16l-11,2l-20,-11l-14,5l-13,15l-6,14l-10,7l-8,-6l-11,-17l-16,3l-14,-14l-10,-24l-3,-13l-12,-11l-11,10l-8,21l3,12l13,12l8,19l-3,19l-12,19l-19,10l-14,-1l-18,-15l-13,2l-12,15l-10,23l1,10l12,11l7,15l2,29l-10,15l-4,20l13,17l18,4l23,-2l17,14l13,3l25,-4l17,-13l13,-2l16,10l17,2l17,-10l15,1l20,11l9,13l-3,12l-14,11l-3,10l8,10l15,4l12,-5l17,-16l14,-2l13,8l9,-1l11,-12l16,-11l20,4l15,-7l16,-14l11,5l15,16l11,-2l14,-11l9,6l10,14l20,7l11,-9l12,1l15,14l10,1l12,-10l13,2l13,-9l11,2l13,12l7,11l-2,10l-13,10l-8,15l-1,10l10,11l15,-3l13,-15l15,-5l10,2l10,9l3,11l-12,13l-11,3l-10,-3l-10,-10l-6,-14l-16,-10l-15,4l-11,-2l-12,-12l-7,-15l2,-15l12,-10l14,-22l10,-20l-2,-15l-10,-12l-20,-3l-12,8l-13,-3l-10,-13l-14,-3l-16,8l-15,-2l-12,-10l-10,2l-14,13l-10,-2l-13,-14Z" },
];

const highlightedStates = ['up', 'br', 'jh'];

export default function InteractiveMap() {
    const [hoveredState, setHoveredState] = useState<{ name: string; x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (hoveredState) {
            setHoveredState(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
        }
    };
    
    return (
        <div className="relative w-full max-w-lg mx-auto">
            <h3 className="text-xl font-headline font-semibold mb-4 text-center">Our Geographic Presence</h3>
            <p className="text-muted-foreground text-center mb-4">
                We are actively serving clients across Eastern Uttar Pradesh, Bihar, Jharkhand, Odisha, West Bengal, and Assam, with plans for further expansion.
            </p>
            <svg 
                viewBox="50 50 600 600"
                className="w-full h-auto drop-shadow-sm"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredState(null)}
            >
                <g>
                    {states.map(state => {
                        const isHighlighted = highlightedStates.includes(state.id);
                        return (
                            <path
                                key={state.id}
                                d={state.path}
                                id={state.id}
                                className={cn(
                                    "transition-all duration-200",
                                    isHighlighted 
                                        ? "fill-primary/50 stroke-primary stroke-[2px] cursor-pointer"
                                        : "fill-gray-200 stroke-white stroke-[1px]",
                                    hoveredState?.name === state.name && "fill-accent/80"
                                )}
                                onMouseEnter={(e) => isHighlighted && setHoveredState({ name: state.name, x: e.clientX, y: e.clientY })}
                            />
                        )
                    })}
                </g>
            </svg>
            {hoveredState && (
                <div 
                    className="fixed pointer-events-none -translate-x-1/2 -translate-y-[calc(100%+1rem)] p-2 text-sm bg-background border rounded-md shadow-lg"
                    style={{ left: hoveredState.x, top: hoveredState.y }}
                >
                    Projects in {hoveredState.name}
                </div>
            )}
            <div className="mt-4 flex justify-center items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-primary/50 border border-primary"></div>
                    <span className="text-sm text-muted-foreground">Service Area</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-gray-200"></div>
                    <span className="text-sm text-muted-foreground">Other Regions</span>
                </div>
            </div>
        </div>
    );
}

    