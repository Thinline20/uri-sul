import type { RLGCode } from "~/types/map";
import { atom } from "nanostores";

export const selectedRLGAtom = atom<RLGCode | null>(null);
