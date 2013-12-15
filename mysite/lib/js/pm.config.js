/**
 * Created with PyCharm.
 * User: jamescheng
 * Date: 7/29/13
 * Time: 5:12 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with PyCharm.
 * User: jamescheng
 * Date: 5/8/13
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */

function pm_config_obj(testRunId){
    this.ip=localStorage.getItem(testRunId+'_faz_ip');
    this.testRunId=testRunId;
    this.SysChIntId=0;
    this.SqdChIntId=0;
    this.FldChIntId=0;
    this.TopChIntId=0;


    this.create_config_page=function(){

        var tab_container="<div id='tabs'>\
            <ul>\
                <li><a href='#tabs-1'>Configuration</a></li>\
                <li><a href='#tabs-2'>Start Test</a></li>\
            </ul>\
            <div id='tabs-2'>\
                 <div id='chart_wrapper'>\
                    <div id='ch_sysperf_w'  class='perf_chart'>\
                        <h3>CPU and Memory Usage</h3>\
                        <button class='ch_btn' style='background-color:#FF3333' id='p_click_sys_stop' disabled>stop</button>\
                        <button class='ch_btn' style='background-color:lightgreen' id='p_click_sys'>start</button>\
                        <div id='ch_sysperf' ></div>\
                    </div>\
                    <div id='ch_systop_w' class='perf_chart'>\
                        <h3 >Key Daemon CPU Usage</h3>\
                        <button class='ch_btn' style='background-color:#FF3333' id='p_click_top_stop' disabled>stop</button>\
                        <button class='ch_btn' style='background-color:lightgreen' id='p_click_top'>start</button>\
                        <div id='ch_systop'></div>\
                    </div>\
                    <div id='ch_fld_w' class='perf_chart'>\
                        <h3 >FortiLogd log receiving rate</h3>\
                        <button class='ch_btn' style='background-color:#FF3333' id='p_click_fortilogd_stop' disabled>stop</button>\
                        <button class='ch_btn' style='background-color:lightgreen' id='p_click_fortilogd'>start</button>\
                        <div id='ch_fld' ></div>\
                    </div>\
                    <div id='ch_spd_w'  class='perf_chart'>\
                        <h3 >Sqlplugind insert rate</h3>\
                        <button class='ch_btn' style='background-color:#FF3333' id='p_click_sqlplugind_stop' disabled>stop</button>\
                        <button class='ch_btn' style='background-color:lightgreen' id='p_click_sqlplugind'>start</button>\
                        <div id='ch_spd' ></div>\
                    </div>\
                 </div>\
            </div>\
            <div id='tabs-1'>\
                <table>  \
                <tr>\
                        <td>  IP Address: </td>\
                        <td> <input type='text' id='p_input_ip' name='model'> </td>\
                        <td> *Build Number: </td>\
                        <td> <input type='text' id='p_input_build' name='build'> </td>\
                </tr>\
                <tr>\
                        <td>User Name:</td>\
                        <td ><input type='text' id='p_input_u' name='username'></td>\
                        <td>Password:</td>\
                        <td ><input type='text' id='p_input_p' name='passwd'></td>\
                </tr>\
                <tr> <td>Device Model: </td>\
                        <td > \
                        <select id='p_select_model'> \
                            <option selected='selected'>VM64</option>\
                            <option>VM32</option>\
                            <option>100C</option> \
                            <option>200D</option> \
                            <option>400B</option> \
                            <option>400C</option> \
                            <option>1000B</option> \
                            <option>1000C</option>\
                            <option>2000A</option>\
                            <option>2000B</option>\
                            <option>4000A</option>\
                            <option>4000B</option>\
                         </select> \
                        <span id='p_span_model'><span>\
                        </td>\
                </tr>\
                <tr>\
                        <td>Test Interval(Seconds)</td>\
                       <td ><input type='text' id='p_input_t' name='time'></td>\
                </tr>\
                <tr>\
                        <td><button id='p_btn_save_basic_config' value='Upgrade'>Save</button></td>\
                </tr>\
                </table>\
                <hr class='grayhr'>\
            </div>\
        </div>";


        $('#layout_center_content').append(tab_container);

        $('#p_input_m').val(localStorage.getItem(this.testRunId+'_faz_model'));
        $('#p_input_ip').val(localStorage.getItem(this.testRunId+'_faz_ip'));
    }

//        if (!jQuery.isEmptyObject(data))
//below 3 for system cpu,mem usage chart

    this.runSysChart=function(interval){

        var self = this;
        var time_array = [];

        this_ip = localStorage.getItem(testRunId+'_faz_ip');
        this_username = localStorage.getItem(testRunId+'_faz_username');
        this_password= localStorage.getItem(testRunId+'_faz_password');

        var y_array = [];
        var y2_array=[];
        this.SysChIntId  =  setInterval(function(){
            myDate = new Date();
            time_array.push(myDate.getHours()+':'+myDate.getMinutes());
           // console.log(time_array);
            //get data here:
            $.get('getSystemStatus?ip='+this_ip+'&username='+this_username+'&passwd='+this_password,function(data){
                dict = JSON.parse(data);
                y_array.push(parseInt(dict.cpu));
                y2_array.push(parseInt(dict.mem));
                       console.log(y_array);
                       console.log(time_array);
                self.showSysChart(time_array,y_array,y2_array);
                    });
        },interval)
    }
    this.clearSysChart = function(){
        clearInterval(this.SysChIntId);
    }
    this.showSysChart=function(x_axis,y_axis,y2_axis){
        //get data from local storage? or get from JSON?
//        var x_list = localStorage.getItem(this.testRunId+'ch1_time')
//        var y_list_cpu = localStorage.getItem(this.testRunId+'ch1_sys_cpu')
//        var y_list_mem=localStorage.getItem(this.testRunId+'ch2_sys_mem')
        //below for test:

        var x_list = x_axis;
        var y_list1 = y_axis;
        var y_list2 = y2_axis;
    //    var y_list1 = [Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1)]
        //get

        //draw data:
        $('#ch_sysperf').wijlinechart({
//            header: {
//                text: "CPU and Memory Usage",
////                textStyle: {fill: "black", "font-size": 12}
//            },
            axis: {
                y: {
                    text: "%",
                    min: 0, //Minimum value for axis
                    max: 100, //Maximum value for axis
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    annoFormatString: 'n0', //Format values on axis as number with 0 decimal places. For example, 4.00 would be shown as 4
                    tickMajor: { position: "outside" }
                },
                x: {
                    text: "",
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    tickMajor: { position: "outside" }

                }
            },
            showChartLabels: false,
            hint: {
                //Display custom information in tooltip. If not set, the content will default to x and y data display values
                content: function () {
                    //Check if multiple data points are on one axis entry. For example, multiple data entries for a single date.
                    if ($.isArray(this)) {
                        var content = "";
                        //Multiple entries of data on this point, so we need to loop through them to create the tooltip content.
                        for (var i = 0; i < this.length; i++) {
                            content += this[i].lineSeries.label + '-- ' + this[i].y  + '\n';
                        }
                        return content;
                    }
                    else {
                        //Only a single data point, so we return a formatted version of it. "/n" is a line break.
                        return this.data.lineSeries.label  +
                            '--' + this.y ;
                    }
                }
            },
            indicator: {
                visible: true
            },
            legend: {
                visible: true,
                compass: "south"

            },
            data: {
                //X axis values as Date objects. We are using a shared x value array for this chart with multiple y value arrays.
                x: x_list
            },
            seriesList: [
                {
                    label: "CPU", //Label shown in legend
                    legendEntry: true,
                    data: {
                        //Y axis values for 1st series
                        y:y_list1
                    }
                },
                {
                    label: "Memory",
                    legendEntry: true,
                    data: {
                        //Y axis values for 2nd series
                        y: y_list2
                    }

                }
            ],
            //Override width of lines for both series. More customization can be done, such as fill, stroke (color) etc.
            seriesStyles: [
                { "stroke-width": 2 },
                { "stroke-width": 2 }


            ],
            //Override width of lines for both series when hovered.
            seriesHoverStyles: [
                { "stroke-width": 3 },
                { "stroke-width": 3 }
            ]
        })
    }

//below 2 for Top values of fortilogd,sqllod and sqlplugind usage chart
        this.runTopChart=function(interval){

            var self = this;
            var time_array = [];
            this_ip = localStorage.getItem(testRunId+'_faz_ip');
            this_username = localStorage.getItem(testRunId+'_faz_username');
            this_password= localStorage.getItem(testRunId+'_faz_password');
            var y_array = [];
            var y2_array=[];
            var y3_array=[];
            this.TopChIntId =  setInterval(function(){
                myDate = new Date();
                time_array.push(myDate.getHours()+':'+myDate.getMinutes());
                // console.log(time_array);
                //get data here:
                $.get('getTop?ip='+this_ip+'&username='+this_username+'&passwd='+this_password,function(data){

                    dict = JSON.parse(data);
                    y_array.push(parseInt(dict.fortilogd));
                    y2_array.push(parseInt(dict.sqllogd));
                    y3_array.push(parseInt(dict.sqlplugind));
                    console.log(y2_array);
                    self.showTopChart(time_array,y_array,y2_array,y3_array);
                });
            },interval)
        }
    this.clearTopChart = function(){
        clearInterval(this.TopChIntId);
    }
        this.showTopChart=function(x_axis,y_axis,y2_axis,y3_axis){

            var x_list = x_axis;
            var y_list1 = y_axis;
            var y_list2 = y2_axis;
            var y_list3 = y3_axis;
            //    var y_list1 = [Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1)]
            //get

            //draw data:
            $('#ch_systop').wijlinechart({

                axis: {
                    y: {
                        text: "%",
                        min: 0, //Minimum value for axis
                        max: 100, //Maximum value for axis
                        autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                        autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                        annoFormatString: 'n0', //Format values on axis as number with 0 decimal places. For example, 4.00 would be shown as 4
                        tickMajor: { position: "outside" }
                    },
                    x: {
                        text: "time",
                        autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                        autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                        tickMajor: { position: "outside" }
                    }
                },
                showChartLabels: false,
                hint: {
                    //Display custom information in tooltip. If not set, the content will default to x and y data display values
                    content: function () {
                        //Check if multiple data points are on one axis entry. For example, multiple data entries for a single date.
                        if ($.isArray(this)) {
                            var content = "";
                            //Multiple entries of data on this point, so we need to loop through them to create the tooltip content.
                            for (var i = 0; i < this.length; i++) {
                                content += this[i].lineSeries.label + ': ' + (this[i].y ) + '\n';
                            }
                            return content;
                        }
                        else {
                            //Only a single data point, so we return a formatted version of it. "/n" is a line break.
                            return this.data.lineSeries.label + '\n' +
                                //Format x as Short Month and long year (Jan 2010). Then format y value as calculared currency with no decimal ($1,983,000).
                                Globalize.format(this.x, 'MMM yyyy') + '-- ' + this.y ;
                        }
                    }
                },
                indicator: {
                    visible: true
                },
                legend: {
                    visible: true,
                    compass: "south"

                },
                data: {
                    //X axis values as Date objects. We are using a shared x value array for this chart with multiple y value arrays.
                    x: x_list
                },
                seriesList: [
                    {
                        label: "Foritlogd", //Label shown in legend
                        legendEntry: true,
                        data: {
                            //Y axis values for 1st series
                            y:y_list1
                        }
                    },
                    {
                        label: "Sqllogd",
                        legendEntry: true,
                        data: {
                            //Y axis values for 2nd series
                            y: y_list2
                        }

                    },
                    {
                        label: "Sqlplugind",
                        legendEntry: true,
                        data: {
                            //Y axis values for 2nd series
                            y: y_list3
                        }

                    }
                ],
                //Override width of lines for both series. More customization can be done, such as fill, stroke (color) etc.
                seriesStyles: [
                    { "stroke-width": 2 },
                    { "stroke-width": 2 },
                    { "stroke-width": 2 }


                ],
                //Override width of lines for both series when hovered.
                seriesHoverStyles: [
                    { "stroke-width": 3 },
                    { "stroke-width": 3 },
                    { "stroke-width": 3 }

                ]
            })

    }



//below 2 for FortiLogd receive rate of Fortilogd speed chart
    this.runFldChart=function(interval){

        var self = this;
        var time_array = [];
        this_ip = localStorage.getItem(testRunId+'_faz_ip');
        this_username = localStorage.getItem(testRunId+'_faz_username');
        this_password= localStorage.getItem(testRunId+'_faz_password');
        var y_array = [];
        var y2_array=[];
        var y3_array=[];
        this.FldChIntId =  setInterval(function(){
            myDate = new Date();
            time_array.push(myDate.getHours()+':'+myDate.getMinutes());
            // console.log(time_array);
            //get data here:
            $.get('getFortilogd?ip='+this_ip+'&username='+this_username+'&passwd='+this_password,function(data){

                result = JSON.parse(data);
                y_array.push(parseInt(result));

                console.log(y_array);
                self.showFldChart(time_array,y_array);
            });
        },interval)
    }
    this.clearFldChart = function(){
        clearInterval(this.FldChIntId);
    }
    this.showFldChart=function(x_axis,y_axis){

        var x_list = x_axis;
        var y_list1 = y_axis;

        //    var y_list1 = [Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1)]
        //get

        //draw data:
        $('#ch_fld').wijlinechart({

            axis: {
                y: {
                    text: "logs",
//                    min: 0, //Minimum value for axis
//                    max: 100, //Maximum value for axis
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    annoFormatString: 'n0', //Format values on axis as number with 0 decimal places. For example, 4.00 would be shown as 4
                    tickMajor: { position: "outside" }
                },
                x: {
                    text: "time",
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    tickMajor: { position: "outside" }
                }
            },
            showChartLabels: false,
            hint: {
                //Display custom information in tooltip. If not set, the content will default to x and y data display values
                content: function () {
                    //Check if multiple data points are on one axis entry. For example, multiple data entries for a single date.
                    if ($.isArray(this)) {
                        var content = "";
                        //Multiple entries of data on this point, so we need to loop through them to create the tooltip content.
                        for (var i = 0; i < this.length; i++) {
                            content += this[i].lineSeries.label + ': ' +(this[i].y ) + '\n';
                        }
                        return content;
                    }
                    else {
                        //Only a single data point, so we return a formatted version of it. "/n" is a line break.
                        return this.data.lineSeries.label + '\n' +
                            //Format x as Short Month and long year (Jan 2010). Then format y value as calculared currency with no decimal ($1,983,000).
                            Globalize.format(this.x, 'MMM yyyy') + ': ' + (this.y );
                    }
                }
            },
            indicator: {
                visible: true
            },
            legend: {
                visible: true,
                compass: "south"

            },
            data: {
                //X axis values as Date objects. We are using a shared x value array for this chart with multiple y value arrays.
                x: x_list
            },
            seriesList: [
                {
                    label: "Receiving Rate", //Label shown in legend
                    legendEntry: true,
                    data: {
                        //Y axis values for 1st series
                        y:y_list1
                    }
                }

            ],
            //Override width of lines for both series. More customization can be done, such as fill, stroke (color) etc.
            seriesStyles: [
                { "stroke-width": 2 }
            ],
            //Override width of lines for both series when hovered.
            seriesHoverStyles: [
                { "stroke-width": 3 }
            ]
        })

    }





//below 2 for Sqlplugind rate  chart
    this.runSpdChart=function(interval){

        var self = this;
        var time_array = [];
        this_ip = localStorage.getItem(testRunId+'_faz_ip');
        this_username = localStorage.getItem(testRunId+'_faz_username');
        this_password= localStorage.getItem(testRunId+'_faz_password');
        var y_array = [];

        this.SqdChIntId =  setInterval(function(){
            myDate = new Date();
            time_array.push(myDate.getHours()+':'+myDate.getMinutes());
            // console.log(time_array);
            //get data here:
            $.get('getSqlplugind?ip='+this_ip+'&username='+this_username+'&passwd='+this_password,function(data){
                console.log(data);
                result = JSON.parse(data);
                y_array.push(parseInt(result));
                console.log(y_array);
                self.showSqdChart(time_array,y_array);
            });
        },interval)
    }


    this.clearSpdChart = function(){
        clearInterval(this.SqdChIntId);
    }

    this.showSqdChart=function(x_axis,y_axis){

        var x_list = x_axis;
        var y_list1 = y_axis;

        //    var y_list1 = [Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1),Math.floor((Math.random()*100)+1)]
        //get

        //draw data:
        $('#ch_spd').wijlinechart({

            axis: {
                y: {
                    text: "logs",
//                    min: 0, //Minimum value for axis
//                    max: 100, //Maximum value for axis
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    annoFormatString: 'n0', //Format values on axis as number with 0 decimal places. For example, 4.00 would be shown as 4
                    tickMajor: { position: "outside" }
                },
                x: {
                    text: "time",
                    autoMin: true, //Tell the chart not to automatically generate minimum value for axis
                    autoMax: true, //Tell the chart not to automatically generate maximum value for axis
                    tickMajor: { position: "outside" }
                }
            },
            showChartLabels: false,
            hint: {
                //Display custom information in tooltip. If not set, the content will default to x and y data display values
                content: function () {
                    //Check if multiple data points are on one axis entry. For example, multiple data entries for a single date.
                    if ($.isArray(this)) {
                        var content = "";
                        //Multiple entries of data on this point, so we need to loop through them to create the tooltip content.
                        for (var i = 0; i < this.length; i++) {
                            content += this[i].lineSeries.label + ': ' + Globalize.format(this[i].y * 1000, 'c0') + '\n';
                        }
                        return content;
                    }
                    else {
                        //Only a single data point, so we return a formatted version of it. "/n" is a line break.
                        return this.data.lineSeries.label + '\n' +
                            //Format x as Short Month and long year (Jan 2010). Then format y value as calculared currency with no decimal ($1,983,000).
                            Globalize.format(this.x, 'MMM yyyy') + ': ' + Globalize.format(this.y * 1000, 'c0');
                    }
                }
            },
            indicator: {
                visible: true
            },
            legend: {
                visible: true,
                compass: "south"

            },
            data: {
                //X axis values as Date objects. We are using a shared x value array for this chart with multiple y value arrays.
                x: x_list
            },
            seriesList: [
                {
                    label: "Receiving Rate", //Label shown in legend
                    legendEntry: true,
                    data: {
                        //Y axis values for 1st series
                        y:y_list1
                    }
                }

            ],
            //Override width of lines for both series. More customization can be done, such as fill, stroke (color) etc.
            seriesStyles: [
                { "stroke-width": 2 }
            ],
            //Override width of lines for both series when hovered.
            seriesHoverStyles: [
                { "stroke-width": 3 }
            ]
        })

    }


    function toHHMMSS(secs)
    {
        var hours = Math.floor(secs / (60 * 60));

        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        var obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }


}


