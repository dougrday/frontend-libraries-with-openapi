import { Component, ElementRef, OnInit } from "@angular/core";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { Observable } from "rxjs";
import { HelloWorld, helloWorldService } from "shared";

@Component({
    selector: "app-hello-world-list",
    templateUrl: "./hello-world-list.component.html",
    styleUrls: ["./hello-world-list.component.css"],
})
export class HelloWorldListComponent implements OnInit {
    messages$: Observable<HelloWorld[]>;

    constructor(private elementRef: ElementRef) {}

    deleteMessage(helloWorldId: string) {
        return helloWorldService.deleteHelloWorld({ helloWorldId }).subscribe();
    }

    handleKeyUp(event: KeyboardEvent, helloWorldId: string) {
        if (event.code === "Delete") {
            event.preventDefault();
            this.deleteMessage(helloWorldId);
        }
    }

    handleLoadMoreClick() {
        helloWorldService.searchNext().subscribe();
    }

    ngOnInit(): void {
        // NOTE: This is a hack to work despite the version difference of RxJS (v6 vs v7)
        this.messages$ = helloWorldService.messages$ as unknown as Observable<HelloWorld[]>;
    }
}