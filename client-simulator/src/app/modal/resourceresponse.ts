export interface ResourceResponse {
    resourceName: string
    resourceId: number;
    resourceType: string;
    skills: any[];
    datasets: any[];
    ownershipChangeCount: number;
    stateChangeCount: number;
    creationTime: Date;
}