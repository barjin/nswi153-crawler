/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/records": {
    /**
     * Get a list of website records
     * @description Get a list of the website records currently in the database. If additional query parameters are provided, the website records are filtered by label,  tag, and/or URL, and is sorted by URL or the time of the last website crawl, in ascending or descending order. Otherwise, the list contains all the  website records and is unsorted.
     */
    get: operations["getRecordsList"];
    /**
     * Insert a new website record
     * @description Insert a new website record to the database of existing website records.
     */
    post: operations["addRecord"];
  };
  "/records/{recordId}": {
    /**
     * Get a website record by ID
     * @description Get the website record from the database of existing website records whose ID matches the ID provided in the path.
     */
    get: operations["getRecord"];
    /**
     * Update a website record by ID
     * @description Update a website record from the database of existing website records whose ID matches the ID provided in the path.
     */
    put: operations["updateRecord"];
    /**
     * Delete a website record by ID
     * @description Delete a website record from the database of existing website records whose ID matches the ID provided in the path.
     */
    delete: operations["deleteRecord"];
  };
  "/executions": {
    /** Get a list of all execution IDs. */
    get: {
      parameters: {
        query?: {
          /** @description Record by which the executions should be filtered */
          recordId?: number;
          /**
           * @description Number of executions to return.
           * @default 10
           */
          limit?: number;
          /** @description Number of executions to skip before returning the remaining records. */
          offset?: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": {
              /**
               * Format: int64
               * @example 1
               */
              total?: number;
              /**
               * Format: int64
               * @example 0
               */
              offset?: number;
              /**
               * Format: int64
               * @example 10
               */
              limit?: number;
              /** @description Array of all execution records */
              records?: components["schemas"]["Execution"][];
            };
          };
        };
        /** @description There are no executions for this recordId */
        404: {
          content: never;
        };
      };
    };
  };
  "/executions/{executionId}": {
    /** Get a execution with a given executionId */
    get: {
      parameters: {
        path: {
          /** @description Execution identifier */
          executionId: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "application/json": components["schemas"]["Execution"];
          };
        };
        /** @description Not found. */
        404: {
          content: never;
        };
      };
    };
    /** Delete an execution with given executionId */
    delete: {
      parameters: {
        path: {
          /** @description Execution identifier */
          executionId: number;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: never;
        };
        /** @description Not found. */
        404: {
          content: never;
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * Website Record
     * @description A record of a website crawl
     */
    WebsiteRecord: {
      /**
       * Format: int64
       * @example 0
       */
      id: number;
      /**
       * Format: uri
       * @description The URL at which the crawler should start.
       * @example https://www.webik.mff.cuni.cz/~studentId
       */
      url: string;
      /**
       * @description The crawler will proceed crawling only the links that match this regular expression.
       * @example https://www.webik.mff.cuni.cz/
       */
      boundaryRegEx: string;
      /**
       * Format: int64
       * @description How often should the site be crawled (in seconds from last execution).
       * @example 3600
       */
      periodicity: number;
      /** @description A user-given label */
      label: string;
      /**
       * @description If inactive, the site is not crawled based on the Periodicity.
       * @default true
       */
      isActive: boolean;
      /** @description A list of user-given tags. */
      tags: string[];
      /**
       * Format: date-time
       * @description The time at the start of the last execution of this website crawl
       */
      lastExecutionTime?: string;
      /**
       * @description The status of the last execution of this website crawl
       * @enum {string}
       */
      lastExecutionStatus?: "succeeded" | "ongoing" | "failed" | "waiting";
    };
    /**
     * Execution record
     * @description The execution of crawler on this URL
     */
    Execution: {
      /** Format: int64 */
      id?: number;
      startURL?: string;
      /** Format: int64 */
      websiteRecordId?: number;
      /** @description The map of crawled pages as a graph */
      nodes?: {
        url: string;
        title?: string;
        /** Format: date-time */
        crawlTime?: string;
        /** @description List of Ids of pages that are hyperlinked from this page. */
        links: number[];
      }[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: {
    /** @description A website record object */
    WebsiteRecord: {
      content: {
        "application/json": components["schemas"]["WebsiteRecord"];
      };
    };
    /** @description An execution record object */
    Execution: {
      content: {
        "application/json": components["schemas"]["Execution"];
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /**
   * Get a list of website records
   * @description Get a list of the website records currently in the database. If additional query parameters are provided, the website records are filtered by label,  tag, and/or URL, and is sorted by URL or the time of the last website crawl, in ascending or descending order. Otherwise, the list contains all the  website records and is unsorted.
   */
  getRecordsList: {
    parameters: {
      query?: {
        /** @description Query string by which the website records should be filtered. */
        filter?: string;
        /** @description Field by which the website records should be filtered. */
        filterBy?: "label" | "tags" | "url";
        /** @description Method by which the website records should be sorted. The website records can be sorted by URL or by the time of the execution of the last crawl,  in ascending or descending order. The value of the parameter should have the format \"<sorting-field>:<sorting-direction>\". */
        sort?:
          | "url:asc"
          | "url:dsc"
          | "lastExecutionTime:asc"
          | "lastExecutionTime:dsc";
        /**
         * @description Number of website records to return.
         * @default 10
         */
        limit?: number;
        /** @description Number of website records to skip before returning the remaining records. */
        offset?: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": {
            /**
             * Format: int64
             * @example 1
             */
            total?: number;
            /**
             * Format: int64
             * @example 0
             */
            offset?: number;
            /**
             * Format: int64
             * @example 10
             */
            limit?: number;
            records?: components["schemas"]["WebsiteRecord"][];
          };
        };
      };
      /** @description Website record list not found */
      404: {
        content: never;
      };
    };
  };
  /**
   * Insert a new website record
   * @description Insert a new website record to the database of existing website records.
   */
  addRecord: {
    requestBody: components["requestBodies"]["WebsiteRecord"];
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["WebsiteRecord"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
    };
  };
  /**
   * Get a website record by ID
   * @description Get the website record from the database of existing website records whose ID matches the ID provided in the path.
   */
  getRecord: {
    parameters: {
      path: {
        /** @description The ID of the record that should be returned */
        recordId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["WebsiteRecord"];
        };
      };
      /** @description Invalid ID */
      400: {
        content: never;
      };
      /** @description Record not found */
      404: {
        content: never;
      };
    };
  };
  /**
   * Update a website record by ID
   * @description Update a website record from the database of existing website records whose ID matches the ID provided in the path.
   */
  updateRecord: {
    parameters: {
      path: {
        /** @description The ID of the record that should be modified */
        recordId: number;
      };
    };
    requestBody: components["requestBodies"]["WebsiteRecord"];
    responses: {
      /** @description Success */
      200: {
        content: {
          "application/json": components["schemas"]["WebsiteRecord"];
        };
      };
      /** @description Invalid ID */
      400: {
        content: never;
      };
      /** @description Record not found */
      404: {
        content: never;
      };
    };
  };
  /**
   * Delete a website record by ID
   * @description Delete a website record from the database of existing website records whose ID matches the ID provided in the path.
   */
  deleteRecord: {
    parameters: {
      path: {
        /** @description The ID of the record that should be deleted */
        recordId: number;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: never;
      };
      /** @description Invalid ID */
      400: {
        content: never;
      };
      /** @description Record not found */
      404: {
        content: never;
      };
    };
  };
}
