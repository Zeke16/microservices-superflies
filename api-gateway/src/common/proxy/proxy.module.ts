import { Module } from "@nestjs/common";
import { ClientProxySuperFlies } from "./client-proxy";

@Module({
    providers: [ClientProxySuperFlies],
    exports: [ClientProxySuperFlies]
})

export class ProxyModule{}