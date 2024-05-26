import { OrgItem } from "./OrgItem";

export interface ChartElement {
    x: number,
    y: number,
    item: any,
    parent?: ChartElement,
    childrenCount: number,
    category: number,
    connection?: string
}