export declare function getWebComponentsJs(): string;
export declare function getWebComponentsJs(): string;
export declare let properties: {
    components: {
        title: string,
        name: string,
        group: string,
        type: string,
        properties: [
            {
                title: string,
                name: string,
                type: string,
                info?: string,
                limit?: number,
                regex?: string,
                example?: string,
                values?: [any] 
            }
        ]
    },
    containers: {
        title: string,
        name: string,
        group: string,
        type: string,
        columns: [
            {
                title: string,
                name: string,
                properties: [
                    {
                        title: string,
                        name: string,
                        type: string,
                        info?: string,
                        limit?: number,
                        regex?: string,
                        example?: string,
                        values?: [any] 
                    }
                ]
            }
        ],
        properties: [
            {
                title: string,
                name: string,
                type: string,
                info?: string,
                limit?: number,
                regex?: string,
                example?: string,
                values?: [any] 
            }
        ]
    }
};