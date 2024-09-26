import React, { useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js/auto";
import * as d3 from "d3";

function HomePage() {
  useEffect(() => {
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#ffcd56",
            "#ff6384",
            "#36a2eb",
            "#fd6b19",
            "#800000",
            "#9A6324",
            "#fabed4",
            "#ffd8b1",
            "#3cb44b",
            "#aaffc3",
          ],
        },
      ],
      labels: [],
    };

    function createChart() {
      Chart.getChart("myChart")?.destroy();

      let chart = document.getElementById("myChart");
      var ctx = chart.getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });

      let budgetValues = "";
      for (let i = 0; i < dataSource.labels.length; i++) {
        if (i !== 0) {
          budgetValues += ", ";
        }
        if (i === dataSource.labels.length - 1) {
          budgetValues += "and ";
        }
        budgetValues += `$${dataSource.datasets[0].data[i]} for ${dataSource.labels[i]}`;
      }

      chart.setAttribute(
        "aria-label",
        `Pie chart showing the distribution of expenses: ${budgetValues}`
      );
    }

    function createChart2() {
      document.getElementById("chart2").innerHTML = '';

      let width = 520;
      let height = width * 0.52;
      let radius = Math.min(width, height) / 2;

      let svg = d3
        .select("#chart2")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

      svg.append("g").attr("class", "slices");
      svg.append("g").attr("class", "labels");
      svg.append("g").attr("class", "lines");

      let pie = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        });

      let innerArc = d3
        .arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);

      let outerArc = d3
        .arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      let colors = d3
        .scaleOrdinal()
        .domain(dataSource.labels)
        .range(dataSource.datasets[0].backgroundColor);

      let labeledData = colors.domain().map((label, index) => {
        return {
          label: label,
          value: dataSource.datasets[0].data[index],
        };
      });

      change(labeledData);

      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }

      function change(data) {
        var slice = svg
          .select('.slices')
          .selectAll('path.slice')
          .data(pie(data))
          .enter()
          .append('path')
          .attr('fill', (d) => colors(d.data.value))
          .attr('d', innerArc);
    
        slice.exit().remove();
    
        var text = svg
          .select('.labels')
          .selectAll('text')
          .data(pie(data))
          .enter()
          .append('text')
          .text((d) => {
            return d.data.label;
          })
          .attr('dy', '.35em')
          .attr('transform', (d) => {
            var pos = outerArc.centroid(d);
            pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
          })
          .style('text-anchor', (d) => {
            return midAngle(d) < Math.PI ? 'start' : 'end';
          });
    
        text.exit().remove();
    
        var polyline = svg
          .select('.lines')
          .selectAll('polyline')
          .data(pie(data))
          .enter()
          .append('polyline')
          .attr('points', (d) => {
            var posA = innerArc.centroid(d);
            var posB = outerArc.centroid(d);
            var posC = outerArc.centroid(d);
            posC[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });
    
        polyline.exit().remove();
      }
    }

    function getBudget() {
      axios
        .get(`http://${window.location.hostname}:3000/budget`)
        .then(function (res) {
          for (var i = 0; i < res.data.myBudget.length; i++) {
            dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
            dataSource.labels[i] = res.data.myBudget[i].title;
          }
          createChart();
          createChart2();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getBudget();
  }, []);

  return (
    <main className="center" id="main">
      <section className="page-area">
        <article className="h-entry">
          <h2 className="p-name">Stay on track</h2>
          <p className="e-content">
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Alerts</h2>
          <p className="e-content">
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Results</h2>
          <p className="e-content">
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Free</h2>
          <p className="e-content">
            This app is free!!! And you are the only one holding your data!
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Stay on track</h2>
          <p className="e-content">
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Alerts</h2>
          <p className="e-content">
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Results</h2>
          <p className="e-content">
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article className="h-entry">
          <h2 className="p-name">Chart</h2>
          <figure>
            <p>
              <canvas id="myChart" width="400" height="400"></canvas>
            </p>
          </figure>
        </article>

        <div id="chart2"></div>
      </section>
    </main>
  );
}

export default HomePage;
