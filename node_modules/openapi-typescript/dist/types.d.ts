/// <reference types="node" />
import type { PathLike } from "node:fs";
import type { RequestInfo, RequestInit, Response } from "undici";
import type { TransformSchemaObjectOptions } from "./transform/schema-object.js";
export interface Extensable {
    [key: `x-${string}`]: any;
}
export interface OpenAPI3 extends Extensable {
    openapi: string;
    info: InfoObject;
    jsonSchemaDialect?: string;
    servers?: ServerObject[];
    paths?: PathsObject;
    webhooks?: {
        [id: string]: PathItemObject | ReferenceObject;
    };
    components?: ComponentsObject;
    security?: SecurityRequirementObject[];
    tags?: TagObject[];
    externalDocs?: ExternalDocumentationObject;
    $defs?: $defs;
}
export interface InfoObject extends Extensable {
    title: string;
    summary?: string;
    description?: string;
    termsOfService?: string;
    contact?: ContactObject;
    license?: LicenseObject;
    version: string;
}
export interface ContactObject extends Extensable {
    name?: string;
    url?: string;
    email?: string;
}
export interface LicenseObject extends Extensable {
    name: string;
    identifier: string;
    url: string;
}
export interface ServerObject extends Extensable {
    url: string;
    description: string;
    variables: {
        [name: string]: ServerVariableObject;
    };
}
export interface ServerVariableObject extends Extensable {
    enum?: string[];
    default: string;
    description?: string;
}
export interface ComponentsObject extends Extensable {
    schemas?: Record<string, SchemaObject>;
    responses?: Record<string, ResponseObject | ReferenceObject>;
    parameters?: Record<string, ParameterObject | ReferenceObject>;
    examples?: Record<string, ExampleObject | ReferenceObject>;
    requestBodies?: Record<string, RequestBodyObject | ReferenceObject>;
    headers?: Record<string, HeaderObject | ReferenceObject>;
    securitySchemes?: Record<string, SecuritySchemeObject | ReferenceObject>;
    links?: Record<string, LinkObject | ReferenceObject>;
    callbacks?: Record<string, CallbackObject | ReferenceObject>;
    pathItems?: Record<string, PathItemObject | ReferenceObject>;
}
export interface PathsObject {
    [pathname: string]: PathItemObject | ReferenceObject;
}
export interface WebhooksObject {
    [name: string]: PathItemObject;
}
export interface PathItemObject extends Extensable {
    get?: OperationObject | ReferenceObject;
    put?: OperationObject | ReferenceObject;
    post?: OperationObject | ReferenceObject;
    delete?: OperationObject | ReferenceObject;
    options?: OperationObject | ReferenceObject;
    head?: OperationObject | ReferenceObject;
    patch?: OperationObject | ReferenceObject;
    trace?: OperationObject | ReferenceObject;
    servers?: ServerObject[];
    parameters?: (ParameterObject | ReferenceObject)[];
}
export interface OperationObject extends Extensable {
    tags?: string[];
    summary?: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
    operationId?: string;
    parameters?: (ParameterObject | ReferenceObject)[];
    requestBody?: RequestBodyObject | ReferenceObject;
    responses?: ResponsesObject;
    callbacks?: Record<string, CallbackObject | ReferenceObject>;
    deprecated?: boolean;
    security?: SecurityRequirementObject[];
    servers?: ServerObject[];
}
export interface ExternalDocumentationObject extends Extensable {
    description?: string;
    url: string;
}
export interface ParameterObject extends Extensable {
    name: string;
    in: "query" | "header" | "path" | "cookie";
    description?: string;
    required?: boolean;
    deprecated?: boolean;
    allowEmptyValue?: boolean;
    style?: string;
    explode?: boolean;
    allowReserved?: boolean;
    schema?: SchemaObject;
    example?: any;
    examples?: {
        [name: string]: ExampleObject | ReferenceObject;
    };
    content?: {
        [contentType: string]: MediaTypeObject | ReferenceObject;
    };
}
export interface RequestBodyObject extends Extensable {
    description?: string;
    content: {
        [contentType: string]: MediaTypeObject | ReferenceObject;
    };
    required?: boolean;
}
export interface MediaTypeObject extends Extensable {
    schema?: SchemaObject | ReferenceObject;
    example?: any;
    examples?: {
        [name: string]: ExampleObject | ReferenceObject;
    };
    encoding?: {
        [propertyName: string]: EncodingObject;
    };
}
export interface EncodingObject extends Extensable {
    contentType?: string;
    headers?: {
        [name: string]: HeaderObject | ReferenceObject;
    };
    style?: string;
    explode?: string;
    allowReserved?: string;
}
export type ResponsesObject = {
    [responseCode: string]: ResponseObject | ReferenceObject;
} & {
    default?: ResponseObject | ReferenceObject;
};
export interface ResponseObject extends Extensable {
    description: string;
    headers?: {
        [name: string]: HeaderObject | ReferenceObject;
    };
    content?: {
        [contentType: string]: MediaTypeObject;
    };
    links?: {
        [name: string]: LinkObject | ReferenceObject;
    };
}
export type CallbackObject = Record<string, PathItemObject>;
export interface ExampleObject extends Extensable {
    summary?: string;
    description?: string;
    value?: any;
    externalValue?: string;
}
export interface LinkObject extends Extensable {
    operationRef?: string;
    operationId?: string;
    parameters?: {
        [name: string]: `$${string}`;
    };
    requestBody?: `$${string}`;
    description?: string;
    server?: ServerObject;
}
export type HeaderObject = Omit<ParameterObject, "name" | "in">;
export interface TagObject extends Extensable {
    name: string;
    description?: string;
    externalDocs?: ExternalDocumentationObject;
}
export interface ReferenceObject extends Extensable {
    $ref: string;
    summary?: string;
    description?: string;
}
export type SchemaObject = {
    discriminator?: DiscriminatorObject;
    xml?: XMLObject;
    externalDocs?: ExternalDocumentationObject;
    example?: any;
    title?: string;
    description?: string;
    $comment?: string;
    deprecated?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    enum?: unknown[];
    const?: unknown;
    default?: unknown;
    format?: string;
    nullable?: boolean;
    oneOf?: (SchemaObject | ReferenceObject)[];
    allOf?: (SchemaObject | ReferenceObject)[];
    anyOf?: (SchemaObject | ReferenceObject)[];
    required?: string[];
    [key: `x-${string}`]: any;
} & (StringSubtype | NumberSubtype | IntegerSubtype | ArraySubtype | BooleanSubtype | NullSubtype | ObjectSubtype | {
    type: ("string" | "number" | "integer" | "array" | "boolean" | "null" | "object")[];
} | {});
export interface StringSubtype {
    type: "string";
    enum?: (string | ReferenceObject)[];
}
export interface NumberSubtype {
    type: "number";
    minimum?: number;
    maximum?: number;
    enum?: (number | ReferenceObject)[];
}
export interface IntegerSubtype {
    type: "integer";
    minimum?: number;
    maximum?: number;
    enum?: (number | ReferenceObject)[];
}
export interface ArraySubtype {
    type: "array";
    prefixItems?: (SchemaObject | ReferenceObject)[];
    items?: SchemaObject | ReferenceObject | (SchemaObject | ReferenceObject)[];
    minItems?: number;
    maxItems?: number;
    enum?: (SchemaObject | ReferenceObject)[];
}
export interface BooleanSubtype {
    type: "boolean";
    enum?: (boolean | ReferenceObject)[];
}
export interface NullSubtype {
    type: "null";
}
export interface ObjectSubtype {
    type: "object" | ["object", "null"];
    properties?: {
        [name: string]: SchemaObject | ReferenceObject;
    };
    additionalProperties?: boolean | Record<string, never> | SchemaObject | ReferenceObject;
    required?: string[];
    allOf?: (SchemaObject | ReferenceObject)[];
    anyOf?: (SchemaObject | ReferenceObject)[];
    enum?: (SchemaObject | ReferenceObject)[];
    $defs?: $defs;
}
export interface DiscriminatorObject {
    propertyName: string;
    mapping?: Record<string, string>;
    oneOf?: string[];
}
export interface XMLObject extends Extensable {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
}
export type SecuritySchemeObject = {
    description?: string;
    [key: `x-${string}`]: any;
} & ({
    type: "apiKey";
    name: string;
    in: "query" | "header" | "cookie";
} | {
    type: "http";
    scheme: string;
    bearer?: string;
} | {
    type: "mutualTLS";
} | {
    type: "oauth2";
    flows: OAuthFlowsObject;
} | {
    type: "openIdConnect";
    openIdConnectUrl: string;
});
export interface OAuthFlowsObject extends Extensable {
    implicit?: OAuthFlowObject;
    password?: OAuthFlowObject;
    clientCredentials?: OAuthFlowObject;
    authorizationCode?: OAuthFlowObject;
}
export interface OAuthFlowObject extends Extensable {
    authorizationUrl: string;
    tokenUrl: string;
    refreshUrl: string;
    scopes: {
        [name: string]: string;
    };
}
export type SecurityRequirementObject = Record<keyof ComponentsObject["securitySchemes"], string[]>;
export interface OpenAPITSOptions {
    additionalProperties?: boolean;
    alphabetize?: boolean;
    auth?: string;
    emptyObjectsUnknown?: boolean;
    cwd?: PathLike;
    defaultNonNullable?: boolean;
    transform?: (schemaObject: SchemaObject, options: TransformSchemaObjectOptions) => string | undefined;
    postTransform?: (type: string, options: TransformSchemaObjectOptions) => string | undefined;
    immutableTypes?: boolean;
    silent?: boolean;
    version?: number;
    httpHeaders?: Record<string, any>;
    httpMethod?: string;
    exportType?: boolean;
    supportArrayLength?: boolean;
    pathParamsAsTypes?: boolean;
    commentHeader?: string;
    inject?: string;
    fetch?: Fetch;
    excludeDeprecated?: boolean;
}
export type Subschema = {
    hint: "LinkObject";
    schema: LinkObject;
} | {
    hint: "HeaderObject";
    schema: HeaderObject;
} | {
    hint: "MediaTypeObject";
    schema: MediaTypeObject;
} | {
    hint: "OpenAPI3";
    schema: OpenAPI3;
} | {
    hint: "OperationObject";
    schema: OperationObject;
} | {
    hint: "ParameterObject";
    schema: ParameterObject;
} | {
    hint: "ParameterObject[]";
    schema: (ParameterObject | ReferenceObject)[] | Record<string, ParameterObject | ReferenceObject>;
} | {
    hint: "RequestBodyObject";
    schema: RequestBodyObject;
} | {
    hint: "ResponseObject";
    schema: ResponseObject;
} | {
    hint: "SchemaMap";
    schema: Record<string, SchemaObject | ReferenceObject | PathItemObject>;
} | {
    hint: "SchemaObject";
    schema: SchemaObject;
};
export interface GlobalContext {
    additionalProperties: boolean;
    alphabetize: boolean;
    cwd?: PathLike;
    emptyObjectsUnknown: boolean;
    defaultNonNullable: boolean;
    discriminators: {
        [$ref: string]: DiscriminatorObject;
    };
    transform: OpenAPITSOptions["transform"];
    postTransform: OpenAPITSOptions["postTransform"];
    immutableTypes: boolean;
    indentLv: number;
    operations: Record<string, {
        comment?: string;
        operationType: string;
    }>;
    parameters: Record<string, ParameterObject>;
    pathParamsAsTypes: boolean;
    silent: boolean;
    supportArrayLength: boolean;
    excludeDeprecated: boolean;
}
export type $defs = Record<string, SchemaObject>;
export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
