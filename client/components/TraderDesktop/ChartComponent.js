import React from 'react';
import ReactDOM from 'react-dom';
import { WindowResizeListener } from 'react-window-resize-listener';

var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
var Legend = require('react-d3-core').Legend;

class ChartComponent extends React.Component{

    constructor(props){
        super(props);
        this.width=1000;
        this.showLegend;
    }
    componentDidMount(){
        this.props.getOrders("http://localhost:8080/orders");
    }


    changeWidth(windowSize){
        if (windowSize.windowWidth <= 768 ) {
            this.width = windowSize.windowWidth;
            this.showLegend = true;
        }
        else if(windowSize.windowWidth < 998){
            this.width = windowSize.windowWidth-150;
            if(windowSize.windowWidth <= 991)
                this.showLegend = true;
            else
                this.showLegend = false;
        }
        else {
            this.width = 840;
            this.showLegend = false;
        }
        this.setState({});
    }

    
  

    render(){
        var data=[];
        var count=0;
        var height=50;
        var chartData=this.props.orders.map((item,index)=>{

            var id=item.id;
            var qplaced=item.quantityPlaced-item.quantityExecuted;
            var Executed=(item.quantityExecuted/item.quantity);
            var Placed=(qplaced/item.quantity);
            var Total=1-Executed-Placed;
            data.push({id,Executed,Placed,Total});
            console.log(id,Total,Executed,Placed);
            height+=50;
            count++;
        });

        var chartSeries  = [
            {
            field: 'Executed',
            name: 'Executed', 
            color:'#FF8000'
           },
            {
            field: 'Placed',
            name: 'Placed', 
            color:'#FEBB68'
            },
            {
            field: 'Total',
            name: 'Total Orders', 
            color:'#FFEFBF'
            }
        ];
        var y = function(d) {
            return d.id;
        },
        x = function(d) {
            return +d;
        },
        width=this.width,
        legendClassName = "test-legend",
        legendPosition = 'right',
        yScale = "ordinal",
        yLabel = 'Order Id',
        showYGrid = false,
        xOrient = 'top',
        xTickOrient = 'top',
        yOrient="right",
        legendOffset=1000,
        xTickFormat = d3.format("%"),
        xTicks=[2,"%"],
        showLegend=false,
        yTicks=[y,"%"];
        // var orderData=this.props.orders[0];
        //   console.log(orderData);   
            return (
                
                <div>
                    <h1 className="text-center">Order Execution Status</h1>
                <WindowResizeListener onResize={this.changeWidth.bind(this)}/>
                    
                    <div className="container col-xs-12">
                <div className="col-xs-8">
                    <BarStackHorizontalChart
                        title=''
                        data={data}
                        chartSeries={chartSeries}
                        width={width}
                        height={height}
                        showYGrid={showYGrid}
                        xOrient={xOrient}
                        yOrient={yOrient}
                        yScale={yScale}
                        yLabel={yLabel}
                        y={y}
                        x={x}
                        xTicks={xTicks}
                        yTicks={yTicks}
                        xTickFormat={xTickFormat}
                        legendClassName = {legendClassName}
                        legendPosition= {legendPosition}
                        showLegend={showLegend}
                    /></div>
                    <div className="col-xs-4">
                    <Legend
                        width= {150}
                        height= {150}
                        legendClassName= {legendClassName}
                        legendPosition= {legendPosition}
                        legendOffset= {legendOffset}
                        chartSeries = {chartSeries}

                    />
                    </div> 
                    </div>
                </div>
        )
    }
};


export default ChartComponent;