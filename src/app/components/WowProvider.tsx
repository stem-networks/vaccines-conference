"use client";

import { useEffect } from "react";

export default function WowProvider() {
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const WOW = (await import("wowjs")).WOW;
                new WOW().init();
            }
        })();
    }, []);

    return null;
}