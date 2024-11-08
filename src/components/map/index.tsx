import type { Path, RLGCode, RLGName } from "~/types/map";
import type { FeatureCollection, Polygon } from "geojson";
import { useStore } from "@nanostores/solid";
import { descending, geoMercator, geoPath, json, select, selectAll } from "d3";
import { createEffect, createSignal, For, onMount, Show } from "solid-js";
import { feature } from "topojson-client";
import { selectedRLGAtom } from "~/atoms/rlg";
import { codeData } from "./data";
import { RLG } from "./rlg";

const names = [
  "Seoul",
  "Busan",
  "Daegu",
  "Incheon",
  "Gwangju",
  "Daejeon",
  "Ulsan",
  "Sejong-si",
  "Gyeonggi-do",
  "Chungcheongbuk-do",
  "Chungcheongnam-do",
  "Jeollanam-do",
  "Gyeongsangbuk-do",
  "Gyeongsangnam-do",
  "Jeju Island",
  "Gangwon State",
  "Jeonbuk State",
];

export function KoreaMap() {
  let map: SVGSVGElement;
  const maxWidth = 600;
  const maxHeight = 800;

  const [paths, setPaths] = createSignal<Map<number, Path[]>>(new Map());
  const selectedRLG = useStore(selectedRLGAtom);

  onMount(() => {
    const projection = geoMercator()
      .center([128.3, 35.9])
      .scale(6500)
      .translate([maxWidth / 2, maxHeight / 2]);
    const pathGenerator = geoPath().projection(projection);

    // @ts-ignore
    json("/map-data/sigungu.json").then((mapJson) => {
      const geoData = feature(
        // @ts-ignore
        mapJson,
        // @ts-ignore
        mapJson.objects.sigungu,
      ) as any as FeatureCollection<Polygon>;

      const paths = new Map<number, Path[]>(
        Object.entries(codeData).map(([code, v]) => [parseInt(code), []]),
      );

      geoData.features.forEach((data) => {
        if (!data.properties) {
          return;
        }

        const sig_cd = Math.floor(data.properties.SIG_CD / 1000);

        paths.get(sig_cd)?.push({
          code: sig_cd,
          name: data.properties.SIG_ENG_NM,
          korName: data.properties.SIG_KOR_NM,
          path: pathGenerator(data)!,
        });
      });

      setPaths(paths);
    });
  });

  function sortPaths(selected: RLGCode | null) {
    if (selected === null) {
      return;
    }

    const rlgs = select(map).selectAll(".rlg");

    const selectedRLGPath = rlgs.filter(`[data-code="${selected}"]`);

    // @ts-ignore
    selectedRLGPath.node()!.parentNode.appendChild(selectedRLGPath.node());
  }

  createEffect(() => {
    sortPaths(selectedRLG());
  });

  return (
    <Show when={paths().size !== 0}>
      <svg width={maxWidth} height={maxHeight} ref={map!} class="motion-preset-focus">
        <For each={Array.from(paths())}>
          {([code, pathList]) => (
            <RLG
              location={codeData[code].location}
              locationKorean={codeData[code].locationKor}
              paths={pathList}
              code={code as RLGCode}
              center={codeData[code].center}
            />
          )}
        </For>
      </svg>
    </Show>
  );
}
