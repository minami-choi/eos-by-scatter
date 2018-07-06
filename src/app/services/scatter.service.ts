import { Injectable } from "@angular/core";
import * as Eos from 'eosjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ScatterService {
    eos: any;
    scatter: any;
    network: any;


    load() {
        this.scatter = (<any>window).scatter;
        console.log(this.scatter)
        // eosmetal에서 제공하는 이오스 네트워크 => 우리 EOS 노드 네트워크 정보로 바꿔야겠지? 아니면 eosmetal을 사용?
        this.network = {
            blockchain: 'eos',
            host: environment.eosHost,
            port: environment.eosPort,
            chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
        };
        this.eos = this.scatter.eos(this.network, Eos, {}, environment.eosProtocol);
    }

    login() {
        const requirements = { accounts: [this.network] };
        if(!this.scatter) return false;
        if(!this.network) return false;
        return this.scatter.getIdentity(requirements)
    }

    logout() {
        try {
            if(!this.scatter) return false;
            if(!this.scatter.identity) return false;
            return this.scatter.forgetIdentity();
        } catch (error) {
            console.log("logout error", error)
        }
    }
}