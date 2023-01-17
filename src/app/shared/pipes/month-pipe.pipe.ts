import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthpipe', pure: true })

export class MonthPipePipe implements PipeTransform {
    transform(month: number): string {
        const date = new Date();
        date.setMonth(month - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    }
}
