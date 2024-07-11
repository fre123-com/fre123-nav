import type { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyResultV2, Context } from "aws-lambda";
import "#internal/nitro/virtual/polyfill";
export declare function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>;
export declare function handler(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2>;
