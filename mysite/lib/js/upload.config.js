/**
 * Created with PyCharm.
 * User: jamescheng
 * Date: 5/8/13
 * Time: 2:09 PM
 * To change this template use File | Settings | File Templates.
 */

function upload_config_obj(testRunId){
    this.ip='';
    this.model='';
    this.build='';
    this.chartList=[];
    this.testRunId=testRunId;

    this.create_config_page=function(){

        var tab_container="<div id='tabs'>\
            <ul>\
                <li><a href='#tabs-1'>Configuration</a></li>\
                <li><a href='#tabs-2'>Start Test</a></li>\
            </ul>\
            <div id='tabs-2'>\
                <div> <button id='btn_chart_list_1' >\
                Chart_before_upgrade</button> \
                <button id='btn_load_image' >\
                Load New Image</button> \
                <button id='btn_chart_list_2' >\
                Chart_after_upgrade</button> \
                <button id='btn_compare' >\
                Compare</button> </div>\
                <div class='left'>\
                    <p><b>Chart Data Before Upgrade</b></p>\
                    <div id='show_chart_left' style='height:300px; width:470px;'  >\
                    <!--<table id='wijgrid'>-->\
                    <!--</table>-->\
                    </div>\
                </div>\
                <div class='right'>\
                    <p><b>Compare Result</b></p>\
                    <div id='show_compare_result' style='height:300px; width:470px;' >\
                    <!--<table id='wijgrid'>-->\
                    <!--</table>-->\
                    </div>\
                </div>\
                <div class='mid'>\
                    <p><b>Chart Data After Upgrade</b></p>\
                    <div id='show_chart_right' style='height:300px; width:470px'>\
                    <!--<table id='wijgrid'>-->\
                    <!--</table>-->\
                    </div>\
                </div>\
            </div>\
            <div id='tabs-1'>\
                <table>  \
                <tr>\
                        <td>  IP Address: </td>\
                        <td > <input type='text' id='f_input_ip' name='model'> </td>\
                </tr>\
                <tr> <td>Device Model: </td>\
                        <td > \
                        <select id='select_model'> \
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
                        <span id='span_model'><span>\
                        </td>\
                </tr>\
                <tr>\
                        <td>Target Build:</td>\
                        <td ><input type='text' id='f_input_b' name='build'></td>\
                </tr>\
                <tr>\
                        <td><button id='btn_save_basic_config' value='Upgrade'>Save</button></td>\
                </tr>\
                </table>\
                <hr class='grayhr'>\
                <table>\
                 <tr>\
                        <td>ADOM:</td>\
                        <td >\
                         <select id='select_adom'>\
                         <option selected='selected'>root</option>\
                            </select>\
                         <span id='span_adom'><span>\
                        </td>\
                </tr>\
                <tr>\
                        <td>Device list:</td>\
                        <td ><input type='text' id='f_input_d' name='device'><button id='btn_add_dev'>add</button><span id='span_dev'><span></td>\
                </tr>\
                <tr>\
                        <td><button id='btn_save_adom_config' value='adom'>Save</button></td>\
                </tr>\
                        </table>\
                <hr class='grayhr'>\
                <p><b>Select Charts to the test</b></p>\
                <div id='add_chart_container'>\
                    <div id='add_chart_sub_container'>\
                        <button class = 'cls_add_chart' >choose</button> <input id='input_chart_name'/><button class = 'cls_delete_chart' >delete</button> \
                        <br/>\
                    </div>\
                </div>\
                <button id='btn_add_more'>Add more chart</button>\
                <button id='btn_save_chart_list'>Save </button>\
                <hr class='grayhr'>\
            </div>\
        </div>";


        $('#layout_center_content').append(tab_container);

        $('#f_input_b').val(localStorage.getItem( this.testRunId+'_faz_build'));
        $('#f_input_m').val(localStorage.getItem(this.testRunId+'_faz_model'));
        $('#f_input_ip').val(localStorage.getItem(this.testRunId+'_faz_ip'));
    }

//    this.create_start_page=function(){
//
//        var start_page = "<div> <button id='btn_chart_list_1' >" +
//            "Chart_before_upgrade</button> " +
//            "<button id='btn_load_image' >" +
//            "Load New Image</button> " +
//            "<button id='btn_chart_list_2' >" +
//            "Chart_after_upgrade</button> " +
//            "<button id='btn_compare' >" +
//            "Compare</button> </div>";
//
//        var container=" \
//            <div class='left'>\
//            <p><b>Chart Data Before Upgrade</b></p>\
//            <div id='show_chart_left' style='height:300px; width:470px;'  >\
//            <!--<table id='wijgrid'>-->\
//            <!--</table>-->\
//            </div>\
//            </div>\
//            <div class='right'>\
//            <p><b>Compare Result</b></p>\
//            <div id='show_compare_result' style='height:300px; width:470px;' >\
//            <!--<table id='wijgrid'>-->\
//            <!--</table>-->\
//            </div>\
//            </div>\
//            <div class='mid'>\
//            <p><b>Chart Data After Upgrade</b></p>\
//            <div id='show_chart_right' style='height:300px; width:470px'>\
//            <!--<table id='wijgrid'>-->\
//            <!--</table>-->\
//            </div>\
//            </div>";
//
//        var tab_container="<div id='tabs'>\
//            <ul>\
//                <li><a href='#tabs-1'>tab1</a></li>\
//                <li><a href='#tabs-2'>tab2</a></li>\
//            </ul>\
//            <div id='tabs-1'>\
//                <p>tab1 </p>\
//            </div>\
//            <div id='tabs-2'>\
//                <p>tab2</p>\
//            </div>\
//        </div>"
//
//
//        //$('#layout_center_content').append(start_page);
//        $('#layout_center_content').append(tab_container);
//    }

    this.getChartList=function(ip,faz_adom,testRunId,state,devid){

        $.getJSON('chart_list?ip='+ip+'&adom='+faz_adom, function (data) {
            var id= 1,
             my_div_id = '',
             div_id='';


            if (state==0)//before upgrade
            {
                $container = $("#show_chart_left");
                my_div_id='chart_div_left';
            }
            else if (state==1)
            {
                $container = $("#show_chart_right");
                my_div_id='chart_div_right';
            }
            else{

                alert("state="+state+"    state error, is it before upgrade or after upgrade??.");
                return;
            }
            data.sort().forEach(function(entry){
                //create new table in div show chart:
                div_id=my_div_id+id;
                $container.append('<div '+'id='+div_id+' class='+'chart_div'+' />');
                $('#'+div_id).append("<h4>"+entry+"</h4>");
                $container.append("<br/>")
                // get data
                getChartData(ip,faz_adom,testRunId,entry,div_id,state,devid/*,graph_type,table_subtype*/);
                //setTimeout(function(){;},2000);
                id=id+1;
            })
            this.chartList = data.sort();
            localStorage.setItem(testRunId+'_chartList',JSON.stringify(this.chartList));
        });
    }

    this.createReportData=function(){
        //for each chart in chart list, build up report
        var id= 1,
            my_div_id='chart_div_left',
            div_id='';
            chart_list=JSON.parse(localStorage.getItem('chartList'));

        chart_list.forEach(function(chartName){
            var before_upgrade_data = JSON.parse(localStorage.getItem(chartName+'_before_upgrade'));
            var data=before_upgrade_data;
            var items = [];

            var ls_var = '';
            var id_offset=2100;
            var table_id='';
            div_id=my_div_id+id;
            $('#show_chart_left').append('<div '+'id='+div_id+' class='+'chart_div'+' />');
            $('#show_chart_left'+div_id).append("<h4>"+chartName+"</h4>");
            $('#show_chart_left').append("<br/>")

            value = data[chartName];
            // if data has fields, than the chart has data, other wise it's no data
            if (!jQuery.isEmptyObject(data))
            {
                table_id = 'tbl' + id_offset+div_id;
                $('#' + div_id).append("<table id=" + table_id + "></table>");

                if (value!="no data")
                {
                    //making fields
                    var columns_list = [];
                    $.each(data['fields'],function(idx,value) {
                        var tmp_dict={};
                        tmp_dict['headerText']=data['fields'][idx];
                        columns_list[columns_list.length]=tmp_dict;

                    });

                    $('#' + table_id).wijgrid({
                        allowSorting: true,
                        //allowPaging: true,
                        pageSize: 10,
                        data: value,
                        columns:columns_list,
                        allowEditing: false,
                        scrollMode: "horizontal"
                    });

                    $('#' + table_id).wijgrid('setSize', 460);
                }
                else // no data
                {
                    $("#"+table_id).wijgrid({
                        allowSorting: true,
                        //allowPaging: true,
                        pageSize: 10,
                        data: [
                            ['no data']
                        ],
                        columns: [
                            { headerText: "no data" }

                        ]
                    });
                    $("#"+table_id).wijgrid('setSize', 460);
                }
            }

            id=id+1;
        });
    }
}

function getChartData(ip,faz_adom,testRunId,chartName,div_id,state,devid /*,graph_type,table_subtype*/) {



    $.getJSON('rtm?ip='+ip+'&adom='+faz_adom+'&chart='+chartName+'&state='+state+'&devid='+devid).then(
        function(data){

                var items = [];
            console.log("this is get Chart data");
            console.log("ip="+ip);
            console.log("faz_adom="+faz_adom);
            console.log("testRunId="+testRunId);
            console.log("chartName="+chartName);
            console.log("div_id="+div_id);
            console.log("state="+state);
            console.log("devid="+devid);
                console.log(data);
                var ls_var = '';
                var id_offset=2100;
                var table_id='';
                //store this data in local storage(a object : {chartname:chartvalue,fieldname,fieldvalue}) to local storage.
                if(typeof(Storage)!=="undefined")
                {
                    if (state == '0')
                    {
                        ls_var = chartName+'_before_upgrade';
                    }
                    else if (state == '1')
                    {
                        ls_var = chartName+'_after_upgrade';
                    }
                    else{
                        alert("wrong state value");
                    }
                    localStorage.setItem(testRunId+'_'+ls_var, JSON.stringify(data));
                }
                else
                {
                    alert("Sorry, your browser does not support web storage...");
                }
                //console.log(data[chartName]);
                value = data[chartName];
                // if data has fields, than the chart has data, other wise it's no data
                if (!jQuery.isEmptyObject(data))
                {
                    table_id = 'tbl' + id_offset+div_id;
                    $('#' + div_id).append("<table id=" + table_id + "></table>");

                    if (value!="no data")
                    {
                        //making fields
                        var columns_list = [];
                        $.each(data['fields'],function(idx,value) {
                            var tmp_dict={};
                            tmp_dict['headerText']=data['fields'][idx];
                            columns_list[columns_list.length]=tmp_dict;

                        });

                        $('#' + table_id).wijgrid({
                            allowSorting: true,
                            //allowPaging: true,
                            pageSize: 10,
                            data: value,
                            columns:columns_list,
                            allowEditing: false,
                            scrollMode: "horizontal"
                        });

                        $('#' + table_id).wijgrid('setSize', 460);
                    }
                    else // no data
                    {
                        $("#"+table_id).wijgrid({
                            allowSorting: true,
                            //allowPaging: true,
                            pageSize: 10,
                            data: [
                                ['no data']
                            ],
                            columns: [
                                { headerText: "no data" }

                            ]
                        });
                        $("#"+table_id).wijgrid('setSize', 460);
                    }
                }


    },

        function(){
            console.log("rtm request fail");
        }
    );


}
