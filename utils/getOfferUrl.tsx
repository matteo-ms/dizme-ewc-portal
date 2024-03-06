import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AvailableCredential } from '@/types/credentials';
import { getIssuerDid, resolveIssuanceKey } from './issuerDids';

const getOfferUrl = async (credentials: Array<AvailableCredential>, NEXT_PUBLIC_VC_REPO: string, NEXT_PUBLIC_ISSUER: string) => {
  const payload = await Promise.all(credentials.map(async (c) => {
    const offer = { ...c.offer, id: uuidv4() };
    const mapping = await (await fetch(`${NEXT_PUBLIC_VC_REPO}/api/mapping/${c.id}`).then(data => {
      return data.json();
    }).catch(err => {
      return null;
    }));
    // TODO: return error if issuer DID is not found
    const issuerDid = getIssuerDid(c.issuer.name);
    if (!issuerDid) {
      throw new Error('Issuer DID not found');
    }
    const issuanceKey = await resolveIssuanceKey(issuerDid);
    if (!issuanceKey) {
      throw new Error('Issuance key not found');
    }
    console.log('issuerDid', issuerDid);
    console.log('issuanceKey', issuanceKey);
    console.log('issuanceKey', JSON.stringify(issuanceKey));
    let payload: {
      'issuerDid': string,
      'issuanceKey': { "type": "local", "jwk": string },
      vc: any,
      mapping?: any,
      selectiveDisclosure?: any
    } = {
      'issuerDid': issuerDid,
      'issuanceKey': { "type": "local", "jwk": JSON.stringify(issuanceKey) },
      vc: offer
    }

    if (c.selectedFormat === "SD-JWT + VCDM") {
      payload.selectiveDisclosure = {
        "fields": {
          "credentialSubject": {
            sd: false,
            children: {
              fields: {}
            }
          }
        }
      }
      for (const key in offer.credentialSubject) {
        if (typeof offer.credentialSubject[key] === 'string') {
          payload.selectiveDisclosure.fields.credentialSubject.children.fields[key] = {
            sd: true
          }
        }
      }
    }
    return mapping ? { ...payload, mapping } : payload;
  }));

  //TODO: throw error when credentials length is 0
  const issueUrl = NEXT_PUBLIC_ISSUER + `/openid4vc/${credentials.length === 1 && credentials[0].selectedFormat === "SD-JWT + VCDM" ? "sdjwt" : "jwt"}/${(payload.length > 1 ? 'issueBatch' : 'issue')}`;
  return axios.post(issueUrl, payload.length > 1 ? payload : payload[0]);
}

export { getOfferUrl };
