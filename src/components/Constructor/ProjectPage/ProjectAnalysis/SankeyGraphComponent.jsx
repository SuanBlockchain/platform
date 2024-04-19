import React from "react";
import { Sankey, Tooltip, Rectangle } from "recharts";

const SankeyGraphComponent = (props) => {
  const { infoSankeyGraph } = props;
  const prepareData = () => {
    const nodes = infoSankeyGraph.data[0].node.label.map((label, index) => ({
      name: label,
      color: "#83a6ed",
    }));
    const links = infoSankeyGraph.data[0].link.source.map((source, index) => ({
      source: source,
      target: infoSankeyGraph.data[0].link.target[index],
      value: infoSankeyGraph.data[0].link.value[index],
      color: "rgba(205, 204, 205, 0.3)",
    }));

    const data = { nodes: nodes, links: links };
    console.log(data, "sankey data");
    return data;
  };

  const data = prepareData();
  const MyCustomComponent = (props) => {
    return (
      <path
        fill={props.payload.color}
        fill-opacity="0.1"
        stroke={props.payload.stroke}
        stroke-width="2"
        x={props.x}
        y={props.y}
        width="10"
        height={props.height}
        radius="0"
        className="recharts-rectangle recharts-sankey-node"
        d={`M ${props.x},${props.y} h ${props.width} v ${props.height} h -${props.width} Z`}
      />
    );
  };
  const MyCustomLinkComponent = (props) => {
    return (
      <path
        d={`
        M${props.sourceX},${props.sourceY}
        C${props.sourceControlX},${props.sourceY} ${props.targetControlX},${props.targetY} ${props.targetX},${props.targetY}
      `}
        stroke={props.payload.color}
        strokeWidth={props.linkWidth}
        {...props}
      />
    );
  };
  return (
    <Sankey
      width={1200}
      height={300}
      /* node={<MyCustomComponent />}
      link={<MyCustomLinkComponent />} */
      data={data}
      margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
    >
      <Tooltip />
    </Sankey>
  );
};

export default SankeyGraphComponent;

/*   const getColorByIndex = (index: number) => {
    const colors = [
      '#8884d8',
      '#83a6ed',
      '#8dd1e1',
      '#82ca9d',
      '#a4de6c',
      '#d0ed57',
      '#ffc658',
      '#ff7f0e',
    ];
    return colors[index % colors.length];
  }; */
