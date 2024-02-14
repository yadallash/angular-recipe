import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
    subscription: Subscription;

    constructor(private dataStorageService: DataStorageService) { }


    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
    }

    fetchData() {
        this.subscription = this.dataStorageService.fetchRecipes().subscribe();
    }
}