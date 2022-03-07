import { useEffect, useState } from "react";
import { helloWorldService } from "shared/lib/public-api";
import { useTitle } from "../../utils/hooks";
import "./HelloWorld.css";
import HelloWorldForm from "./HelloWorldForm";
import HelloWorldList from "./HelloWorldList";

function HelloWorld() {
    useTitle(<span>Hello, world!</span>);

    // Declare a new state variable, which we'll call "hasMessages"
    const [hasMessages, setHasMessages] = useState(false);
    useEffect(() => {
        const subscription = helloWorldService.hasMessages$.subscribe((value) => setHasMessages(value));
        return () => subscription.unsubscribe();
    }, []);

    let whoSaidHello = null;
    if (hasMessages) {
        whoSaidHello = (
            <div>
                <h2>Who's Said Hello</h2>
                <div className="mdc-card list">
                    <HelloWorldList />
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="grid">
                <div>
                    <h2>Say Hello</h2>
                    <div className="mdc-card padded">
                        <HelloWorldForm />
                    </div>
                </div>
            </div>
            {whoSaidHello}
        </div>
    );
}

export default HelloWorld;
