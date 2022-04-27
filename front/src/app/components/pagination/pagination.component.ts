import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'app-pagination',
    template: `
<div class="text-center" *ngIf="page?.totalPages > 1">
    <ul class="pagination blue">
        <li *ngIf="page?.hasPrevious">
            <a (click)="getPage(page?.currentPage - 1)">
                &laquo;
            </a>
        </li>
        <li>
            <a>
                {{page?.currentPage + 1}}
            </a>
        </li>
        <li *ngIf="page?.hasNext">
            <a (click)="getPage(page?.currentPage + 1)">
                &raquo;
            </a>
        </li>
    </ul>
</div>
  `,
    styles: []
})
export class PaginationComponent {
    @Input() page: any;
    @Output() onClick = new EventEmitter<any>();

    constructor() {
    }

    getPage(page: number) {
        this.onClick.emit(page);
    }
}
