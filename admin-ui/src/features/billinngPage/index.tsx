import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import style from "./style/BillingPage.module.scss";

type DailyStars = {
  date: Date;
  stars: number;
};

type Series = {
  label: string;
  data: DailyStars[];
};

const data: Series[] = [
  {
    label: "React Charts",
    data: [
      {
        date: new Date(),
        stars: 202123,
      },
      // ...
    ],
  },
  {
    label: "React Query",
    data: [
      {
        date: new Date(),
        stars: 10234230,
      },
      // ...
    ],
  },
];

export default function BillingPage() {
  const primaryAxis = useMemo(
    (): AxisOptions<DailyStars> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DailyStars>[] => [
      {
        getValue: (datum) => datum.stars,
      },
    ],
    []
  );

  return (
    <div className={style.wrapper}>
      <div className="container">
        <h1>Billing</h1>
        <div className={style.chartContainer}>
        <Chart
          options={{
            dark: true, // TODO: take this from the selected theme
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />

        </div>
      </div>
    </div>
  );
}
