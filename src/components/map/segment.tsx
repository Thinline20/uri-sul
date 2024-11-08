type SegmentProps = {
  name: string;
  korName: string;
  path: string;
  class?: string;
};

export function Segment(props: SegmentProps) {
  return <path d={props.path} />;
}
