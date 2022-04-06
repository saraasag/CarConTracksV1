import { useMetaMask } from "metamask-react";
import { Button} from 'reactstrap';

function Meta() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <button 
    color="success"
    outline
    className="ms-2"
    onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") return <div>Connected account {account} on chain ID {chainId}</div>

    return null;
}
export default Meta;
