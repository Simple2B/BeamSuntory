export interface IGroupAllocatedBase {
    name: string;
    rate: number;
    assigned_to_inbound: boolean;
    assigned_to_outbound: boolean;
    excluded_from_global_increase: boolean;
}
