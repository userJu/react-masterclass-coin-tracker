import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohicv", coinId],
    () => fetchCoinHistory(coinId)
    //IHistorical을 14개를 받아와야 하니까 [] Array
  );

  return (
    <div>
      {isLoading ? (
        "Loadinng chart..."
      ) : (
        <ApexChart
          type="line"
          series={[{ name: "price", data: data?.map((price) => price.close) }]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              background: "transparent",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0fbcf9"],
                stops: [0, 100],
              },
            },
            colors: ["#0be881"],
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            stroke: { curve: "smooth", width: 4 },

            tooltip: {
              style: {
                fontSize: "12px",
              },
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
