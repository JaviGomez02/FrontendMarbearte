// To parse this data:
//
//   import { Convert, Usuario } from "./file";
//
//   const usuario = Convert.toUsuario(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { Imagen } from "./imagen.interface";
import { Color } from "./page.interface";
import { Product } from "./product.interface";

export interface Usuario {
    username:              string;
    contrasena:            string;
    nombre:                string;
    email:                 string;
    role:                  string;
    enable:                boolean;
    verificationCode:      string;
    direcciones:           any[];
    pedidos:               Pedido[];
    enabled:               boolean;
    password:              string;
    authorities:           Authority[];
    accountNonExpired:     boolean;
    credentialsNonExpired: boolean;
    accountNonLocked:      boolean;
}

export interface Authority {
    authority: string;
}

export interface Pedido {
    id:      number;
    fecha:   Date;
    iva:     number;
    compras: Compra[];
}

export interface Compra {
    articulo: Product;
    cantidad: number;
    price:    number;
}


// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toUsuario(json: string): Usuario {
        return cast(JSON.parse(json), r("Usuario"));
    }

    public static usuarioToJson(value: Usuario): string {
        return JSON.stringify(uncast(value, r("Usuario")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Usuario": o([
        { json: "username", js: "username", typ: "" },
        { json: "contrasena", js: "contrasena", typ: "" },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "role", js: "role", typ: "" },
        { json: "enable", js: "enable", typ: true },
        { json: "verificationCode", js: "verificationCode", typ: "" },
        { json: "direcciones", js: "direcciones", typ: a("any") },
        { json: "pedidos", js: "pedidos", typ: a(r("Pedido")) },
        { json: "enabled", js: "enabled", typ: true },
        { json: "password", js: "password", typ: "" },
        { json: "authorities", js: "authorities", typ: a(r("Authority")) },
        { json: "accountNonExpired", js: "accountNonExpired", typ: true },
        { json: "credentialsNonExpired", js: "credentialsNonExpired", typ: true },
        { json: "accountNonLocked", js: "accountNonLocked", typ: true },
    ], false),
    "Authority": o([
        { json: "authority", js: "authority", typ: "" },
    ], false),
    "Pedido": o([
        { json: "id", js: "id", typ: 0 },
        { json: "fecha", js: "fecha", typ: Date },
        { json: "iva", js: "iva", typ: 0 },
        { json: "compras", js: "compras", typ: a(r("Compra")) },
    ], false),
    "Compra": o([
        { json: "articulo", js: "articulo", typ: r("Articulo") },
        { json: "cantidad", js: "cantidad", typ: 0 },
        { json: "price", js: "price", typ: 3.14 },
    ], false),
    "Articulo": o([
        { json: "id", js: "id", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "descripcion", js: "descripcion", typ: "" },
        { json: "price", js: "price", typ: 3.14 },
        { json: "stock", js: "stock", typ: 0 },
        { json: "categoria", js: "categoria", typ: r("Categoria") },
        { json: "imagenes", js: "imagenes", typ: a("any") },
        { json: "colores", js: "colores", typ: a("any") },
    ], false),
    "Categoria": o([
        { json: "id", js: "id", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "descripcion", js: "descripcion", typ: "" },
        { json: "imagenes", js: "imagenes", typ: a(r("Imagene")) },
    ], false),
    "Imagene": o([
        { json: "id", js: "id", typ: 0 },
        { json: "img", js: "img", typ: "" },
    ], false),
};
