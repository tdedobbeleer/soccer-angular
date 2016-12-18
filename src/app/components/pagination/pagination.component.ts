import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'app-pagination',
    template: `
<div class="text-center" *ngIf="page?.totalPages > 1">
    <ul class="pagination blue">
        <li *ngIf="page?.hasPrevious">
            <a (click)="getPage(currentPage - 1)">
                &laquo;
            </a>
        </li>
        <li>
            <a>
                {{currentPage + 1}}
            </a>
        </li>
        <li *ngIf="page?.hasNext">
            <a (click)="getPage(currentPage + 1)">
                &raquo;
            </a>
        </li>
    </ul>
</div>
  `,
    styles: []
})
export class PaginationComponent implements OnInit {
    @Input() page: any;
    @Output() onClick = new EventEmitter<any>();

    private currentPage: number;

    constructor() {
    }

    ngOnInit() {
        this.currentPage = 0;
    }

    getPage(page: number) {
        this.currentPage = page;
        this.onClick.emit(page);
    }
}
