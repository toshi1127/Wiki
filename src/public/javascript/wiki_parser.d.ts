interface ParserOptions {
    startRule?: string;
    tracer: any;
}

/*
      {
                "message":"expect </1> but </2>",
                "expected":null,
                "found":null,
                "location":{"start":{"offset":0,"line":1,"column":1},
                "end":{"offset":13,"line":1,"column":14}},
                "name":"SyntaxError"
            }
*/

export interface Location {
    start:{
        offset: number,
        line: number,
        column: number
    }
    end: {
        offset: number,
        line: number,
        column: number      
    }
}

export declare class SyntaxError extends Error {
  message: string;
  expected: string | null;
  found: string | null;
  location: Location;
  name : 'SyntaxError';
}

export declare function parse(input: string, options?:ParserOptions):any

