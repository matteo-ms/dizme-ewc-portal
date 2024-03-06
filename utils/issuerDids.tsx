import nextConfig from "@/next.config";

const issuerDids = [
    {
        did: 'did:key:z6MkrHKzgsahxBLyNAbLQyB1pcWNYC9GmywiWPgkrvntAZcj',
        name: 'Infocert'
    },
]

const getIssuerDid = (name: string) => {
    const issuer = issuerDids.find((issuer) => issuer.name === name);
    // if issuer is not found, return empty string
    return issuer?.did || '';
}

const resolveIssuanceKey = async (issuerDid: string) => {
    const NEXT_DID_RESOLVER = nextConfig.publicRuntimeConfig!.NEXT_DID_RESOLVER
    const issuanceKeyResponse = await fetch(`${NEXT_DID_RESOLVER}/1.0/identifiers/${issuerDid}`);
    const issuanceKeyData = await issuanceKeyResponse.json();
    const publicKeyJwk = issuanceKeyData.didDocument.verificationMethod[0].publicKeyJwk
    return publicKeyJwk;
}

export { getIssuerDid, resolveIssuanceKey };