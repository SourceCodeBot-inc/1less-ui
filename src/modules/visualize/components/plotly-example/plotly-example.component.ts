import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '@modules/shared/services/data.service';
import { from, map } from 'rxjs';

const title = 'Comparison of 1less to single use';

@Component({
  selector: 'app-plotly-example',
  templateUrl: './plotly-example.component.html',
  styleUrls: ['./plotly-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlotlyExampleComponent {

  public graph$ = from(this.data.calculate()).pipe(
    map((data) => {
      return {
        data,
        layout: {autosize: true, title}
      }
    })
  );

  constructor(private data: DataService) {}
}
