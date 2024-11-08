import type { Coordinate, Path, RLGCode, RLGKorName, RLGName } from "~/types/map";
import { useStore } from "@nanostores/solid";
import { For } from "solid-js";
import { selectedRLGAtom } from "~/atoms/rlg";
import { Segment } from "./segment";

type RLGProps = {
  code: RLGCode;
  paths: Path[];
  location: RLGName;
  locationKorean: RLGKorName;
  center: Coordinate;
};

export function RLG(props: RLGProps) {
  const selectedRLG = useStore(selectedRLGAtom);
  const selected = () => selectedRLG() === props.code;

  return (
    <g
      class="rlg fill-background stroke-background transition-colors data-[selected=true]:fill-background data-[selected=true]:stroke-foreground data-[selected=false]:hover:fill-foreground data-[selected=false]:hover:stroke-foreground"
      data-selected={selected()}
      onClick={() => selectedRLGAtom.set(props.code)}
      data-location={props.location}
      data-code={props.code}
      data-center={props.center}
    >
      <For each={props.paths}>
        {(path) => (
          <g>
            <Segment name={path.name} korName={path.korName} path={path.path} />
          </g>
        )}
      </For>
    </g>
  );
}
