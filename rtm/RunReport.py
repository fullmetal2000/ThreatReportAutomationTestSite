import SendCmd

__author__ = 'jamescheng'
import time
import json
import telnetlib
import sys
from jsonrpc.proxy import ServiceProxy

#faz_ip =  '' #raw_input("Enter FortiAnalyzer IP Address:\r\n")
#faz_adom = ''
# dev_model = raw_input("Enter FortiAnalyzer model, like: VM32, 1000B,100C... etc\r\n")
# dev_model=dev_model.upper()
# build_no = raw_input("Input target build number which you want to upgrade to, input 4 digit integers like: 0160.\r\n")
# s=ServiceProxy('http://'+faz_ip+'/fazproxy/')
# print 'test begin'

class RunRTM:

    def __init__(self, fazip,fazadom):
        self.faz_ip = fazip
        self.faz_adom = fazadom
        self.__devid = 0
        self.filename_1 = 'TestResult_before_upgrade.txt'
        self.filename_2 = 'TestResult_after_upgrade.txt'

    def run_chart_data(self,chart_name):
        """
        * Initiate request for running an SQL query
        action: "run"
        adom: string
        chart-name: string
        force-refresh: int(boolean)
        time-period: {
            period-type: int,
            period-opt: int,
            period-last-n: int,
            period-start: string,
            period-end: string,
            week-start: int
        }
        device-list: [string, ...]

        Example:
        rtm_command({"action" : "run", "adom" : "root",
        "chart-name" : "Top-Users-By-Bandwidth" , "force-refresh" :
        1,"auto_refresh" : 1,  "refresh_interval" : 5, "time-period" :
        {"period-type" : 15,  "period-opt" : 1,"period-last-n" : 0,
        "period-start":"",    "period-end" : "",     "week-start" : 0},
        "device-list" : ["All_FortiGates"]})

        =>
        return   : u'result': {u'slot_key': 2029630888, u'status':
        u'launching', u'slot_idx': 0, u'chart-name': u'Top-Users-By-Bandwidth'}
        """
        force_refresh =  1
        '''
        Time period defination:
          "today":         0,
  "yesterday":     1,
  "last-n-hours":  2,
  "this-week":     3,
  "last-week":     4,
  "last-7-days":   5,
  "last-n-days":   6,
  "last-2-weeks":  7,
  "last-14-days":  8,
  "this-month":    9,
  "last-month":    10,
  "last-30-days":  11,
  "last-n-weeks":  12,
  "this-quarter":  13,
  "last-quarter":  14,
  "this-year":     15,
  "other":         16
        '''
        time_period = {
            'period-type':  0,
            'period-opt': 1,
            'period-last-n':  24,
            'period-start': '',
            'period-end': '',
            'week-start': 0,
            }


        filter_name = ''
        filter_value =  ''

        params = {
            'action': 'run',
            'adom': 'root',
            'chart-name': chart_name,
            'force-refresh': force_refresh,
            'auto_refresh':1,
            'refresh_interval':5,
            'time-period': time_period,
            'device-list': [self.__devid],
            'filter': []
        }

        # if (vdom):
        #     params['filter'].append({'var': 'vd', 'var-value': vdom})

        #    if (filter_name and filter_value):
        #        params['filter'].append({
        #            'var': filter_name,
        #            'var-value': filter_value
        #        })

        print "this is devid"+self.__devid
        s=ServiceProxy('http://'+self.faz_ip+'/fazproxy/')
        try:
            ret = s.fazmerge.rtm_command(params)
        except:
            print "Can not connect to FAZ, please check the connection"
        return ret

    def fetch_chart_data(self,slot_key,slot_idx,chart_name):
        """
        * Check status
        action: "fetch"
        adom: string
        chart-name: string
        slot_key: int
        slot_idx: int

        Example:

        rtm_command({"action" : "fetch", "adom" : "root",
        "chart-name" : "Top-Users-By-Bandwidth" ,"slot_key": 2029630888,
        "slot_idx": 0 })

        =>
        {u'result': {u'perc': 100, u'status': u'finished',
        u'sql_code': 0, u'fields': [u'User', u'IP', u'Traffic Out', u'Traffic
        In', u'Bandwidth'], u'data': [[u'micheal', u'51.0.0.1', u'5000',
        u'50000', u'55000'], [u'shark', u'102.0.0.1', u'19900', u'10000',
        u'29900'], [u'shark', u'101.0.0.1', u'10330', u'10020', u'20350'],
        [u'userB', u'101.2.3.1', u'10000', u'10000', u'20000'], [u'ming',
        u'92.0.0.1', u'9001', u'9000', u'18001'], [u'ming', u'91.0.0.1',
        u'9000', u'9000', u'18000'], [u'ming', u'91.2.3.1', u'9000', u'9000',
        u'18000'], [u'jessie', u'82.0.0.1', u'8000', u'8011', u'16011'],
        [u'jessie', u'81.0.0.1', u'8000', u'8000', u'16000'], [u'jessie',
        u'81.2.3.1', u'8000', u'8000', u'16000']], u'chart-name':
        u'Top-Users-By-Bandwidth'}}
        """
        params = {
            'action': 'fetch',
            'adom': 'root',
            'chart-name': chart_name,
            'slot_key':slot_key,
            'slot_idx': slot_idx
        }

        s=ServiceProxy('http://'+self.faz_ip+'/fazproxy/')
        ret = s.fazmerge.rtm_command(params)

        return ret
    '''
     return   : u'result': {u'slot_key': 2029630888, u'status':
        u'launching', u'slot_idx': 0, u'chart-name': u'Top-Users-By-Bandwidth'}
    '''

    # # get chart list:
    def get_chart_list(self):
        test = SendCmd.fmgApi5(self.faz_ip,self.faz_adom)
        session = test._login('admin', '', 1)
        obj = test._read("config/adom/" + self.faz_adom + "/sql-report/chart", '', session, '')
        chart_dict, obj2,obj3 = test._parse_chart_cmd(obj)
        chart_list=[]
        for k, v in chart_dict.iteritems():
            chart_list.append(k)
        return chart_list

    def getDeviceInfo(self):
        test = SendCmd.fmgApi5(self.faz_ip,self.faz_adom)
        session = test._login('admin', '', 1)
        device_info={}
        device_info=test.getDeviceInfo(session)
        return device_info

    def getVdomList(self):
        test = SendCmd.fmgApi5(self.faz_ip,self.faz_adom)
        session = test._login('admin', '', 1)
        result=[]
        result=test.getVdomList(session)
        return result

    def getAdomList(self):
        test = SendCmd.fmgApi5(self.faz_ip,self.faz_adom)
        session = test._login('admin', '', 1)
        result=[]
        result=test.getAdomList(session)
        return result

    def get_chart_info(self,chart):
        test = SendCmd.fmgApi5(self.faz_ip,self.faz_adom)
        session = test._login('admin', '', 1)
        chart_dict = {}
        url="config/adom/" + self.faz_adom + "/sql-report/chart/"+chart
        obj = test._read("config/adom/" + self.faz_adom + "/sql-report/chart/"+chart, '', session, '')
        chart_dict= test._parse_chart_info(obj)
        return chart_dict


    def run_single_rtm_report(self,chart,state):
        result_dict={}
        field_list=[]

        ret_run = self.run_chart_data(chart)
        ## get slot id and idx from the run_chart_data and put in the 2nd
        time.sleep(3)
        try:
            result_chart=self.fetch_chart_data(ret_run['result']['slot_key'],ret_run['result']['slot_idx'],chart)
        except:
            print "fetch chart data error"
            pass

        if result_chart.has_key('result'):
            print result_chart['result']
            if result_chart['result'].has_key('data'):
                result_dict[chart]=result_chart['result']['data']
            else:
                result_dict[chart]='no data'
            if result_chart['result'].has_key('fields'):
                field_list = result_chart['result']['fields']
                result_dict['fields'] = field_list

        # if (state == '0'):
        #     file=self.filename_1
        # elif (state == '1'):
        #     file=self.filename_2
        # else:
        #     return "state code error."
        # json.dump(result_dict,open(file,'a+') )
        #time.sleep(2)
        return result_dict

    def run_all_rtm_report(self):
        chart_list,obj2,chart_graphic_inf = self.get_chart_list()
        result_dict={}

        for chart in chart_list:
            ret_run = self.run_chart_data(chart)

            ## get slot id and idx from the run_chart_data and put in the 2nd
            time.sleep(1)
            result_chart=self.fetch_chart_data(ret_run['result']['slot_key'],ret_run['result']['slot_idx'],chart)
            if result_chart.has_key('result'):
                print result_chart['result']
                if result_chart['result'].has_key('data'):
                    result_dict[chart]=result_chart['result']['data']
                else:
                    result_dict[chart]='no data'
        return result_dict

    def compare_report(self,file1,file2):
        result={}
        d1={}
        d2={}
        d1 = json.load(open(file1))
        d2 = json.load(open(file2))

        for k, v in d1.iteritems():
            if v == d2[k]:
                result[k]="same"
            else:
                result[k]="different"
        return result

    def load_image(self,build,model):
    # now use telnet to call load image command in faz:
        try:
            tn = telnetlib.Telnet(self.faz_ip)
        except:
            print '\n******************************************************************'
            print "Can not open host,Pls make sure you can telnet the FA used your PC"
            print '******************************************************************\n'
            return 'connect to FAZ error'
        tn.read_until("login:", 10)
        tn.write('admin' + "\n")
        tn.read_until("Password:", 5)
        tn.write('' + "\n\n")
        Device_name = tn.expect(['#'])[2]
        #print Device_name
        tn.read_until("#", 5)
        cmd = 'execute restore image ftp /home/images02/FortiLog/v500/build'+build+'/FAZ_'+model+'-v500-build'+build+'-FORTINET.out 172.16.100.71 test test'
        # #cmd='execute reboot'
        #print cmd
        tn.write(cmd + "\n")
        tn.read_until("?", 5)
        tn.write('y' + "\n\n")
        ftp_info="ftp path: " +cmd+"\n"
        ftp_info = ftp_info+tn.expect(['#'])[2]
        #print ftp_info
        if ftp_info.__contains__("FTP failed"):
            ftp_info=ftp_info + "FTP failed, check verion number and ftp server 172.16.100.71 connection."
            return ftp_info
        else:
            ftp_info=ftp_info +"image loaded successfully."
            return ftp_info
           # sys.exit()
        time.sleep(180)
        return

    def create_report_file_before_upgrade(self):
        # create result file name
        #filename_1 = 'TestResult_before_upgrade.txt'
        # run first rtm report and dump to file
        result_dict = self.run_all_rtm_report()
        json.dump(result_dict,open(self.filename_1,'a+') )
    ## load image:

    #load_image(build_no,dev_model)
    ## wait 10 minutes
    #time.sleep(600)

    # create result file name
    def create_report_file_after_upgrade(self):
        #filename_2 = 'TestResult_after_upgrade.txt'
        #run 2nd rtm report and dump to file
        result_dict = self.run_all_rtm_report()
        json.dump(result_dict,open(self.filename_2,'a+') )

    # compare 2 rtm reports
    def do_compare(self):
        self.create_report_file_before_upgrade()
        self.create_report_file_after_upgrade()
        result = self.compare_report(self.filename_1,self.filename_2)
        json.dump(result,open('compare_result','w+') )
        return result
    #print result



