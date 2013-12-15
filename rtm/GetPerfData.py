__author__ = 'jamescheng'
import json
import telnetlib
import time
import re
class GetPerf:
    def __init__(self,faz_ip,username,passwd):
        self.faz_ip = faz_ip
        self.username = username
        self.passwd=passwd

    def getSystemStatus(self):
    # now use telnet to call load image command in faz:
        try:
            tn = telnetlib.Telnet(self.faz_ip)
        except:
            print '\n******************************************************************'
            print "Can not open host,Pls make sure you can telnet the FA used your PC"
            print '******************************************************************\n'
            return 'connect to FAZ error'
        tn.read_until("login:", 10)
        tn.write(str(self.username) + "\n")
        tn.read_until("Password:", 5)
        tn.write(str(self.passwd) + "\n\n")
        Device_name = tn.expect(['#'])[2]
        #print Device_name
        tn.read_until("#", 5)
        cmd = 'get system per'
        tn.write(cmd + "\n")
        time.sleep(0.1)
        tn.write("exit\n")
        rs = str(tn.read_all()).rstrip('\r')
        rs = ''.join(rs.split())
        '''  sample output:
        getsystemperCPU:Used:0.5%Used(ExcludedNICE):0.5%CPU_num:1.CPU[0]usage:0%Memory:Total:3,111,484KBUsed:629,668KB20.2%HardDisk:Total:82,565,808KBUsed:2,415,012KB2.9%FlashDisk:Total:47,595KBUsed:33,934KB71.3%exitFAZVM#exi
        CPU:Used: .?%

        Memory:Total:.*Used.*KB.*%

        HardDisk:Total:.*Used:.*KB.*%

        FlashDisk:Total:.*Used.*KB.*%
        '''
        SysDataDict = {}
        #parse  cpu here,
        cpu_pattern = 'CPU:Used:[0-9.]*%Used\(ExcludedNICE\)'
        cpu_data = re.search(cpu_pattern,rs).group(0).replace('CPU:Used:','').replace('%Used(ExcludedNICE)','')

        #parse memory here,
        mem_pattern = 'KB[0-9.]*%HardDisk'
        mem_data = re.search(mem_pattern,rs).group(0).replace('KB','').replace('%HardDisk','')

        #parse Harddisk here:
        hd_pattern = 'KB[0-9.]*%FlashDisk'
        hd_data =  re.search(hd_pattern,rs).group(0).replace('KB','').replace('%FlashDisk','')

        SysDataDict['mem'] = mem_data
        SysDataDict['cpu'] = cpu_data
        SysDataDict['hd'] = hd_data

        #partern for cpu usage:
        return SysDataDict


    def getTop(self):
    # now use telnet to call load image command in faz:
        try:
            tn = telnetlib.Telnet(self.faz_ip)
        except:
            print '\n******************************************************************'
            print "Can not open host,Pls make sure you can telnet the FA used your PC"
            print '******************************************************************\n'
            return 'connect to FAZ error'
        tn.read_until("login:", 10)
        tn.write(str(self.username) + "\n")
        tn.read_until("Password:", 5)
        tn.write(str(self.passwd) + "\n\n")
        Device_name = tn.expect(['#'])[2]
        #print Device_name
        tn.read_until("#", 5)
        cmd = 'exec top'
        tn.write(cmd + "\nq")
        time.sleep(1)
        tn.write("q")
 # 'q' is very important for top command!!!
        time.sleep(0.1)

        tn.write("exit\n")
        rs = str(tn.read_all()).rstrip('\r')

        '''  sample output:

        '''
        TopDataDict = {}
        #parse  cpu here,
        fortilogd_pattern = '[SDR].*fortilogd'
        fortilogd_data=''
        try:
            fortilogd_data = re.search(fortilogd_pattern,rs).group(0).replace('fortilogd','')
        except:
            fortilogd_data = '0'
            pass

        ftd_list = fortilogd_data.split()
        #parse memory here,
        sqllogd_pattern = '[SDR].*sqllogd'
        sqllogd_data=''

        try:
            sqllogd_data =re.search(sqllogd_pattern,rs).group(0).replace('sqllogd','')
        except:
            sqllogd_data = '0'
            pass

        sqld_list = sqllogd_data.split()
        #parse Harddisk here:
        sqlplugind_pattern = '[SDR].*sqlplugind'
        sqlplugind_data=''
        try:
            sqlplugind_data =  re.search(sqlplugind_pattern,rs).group(0).replace('sqlplugind','')
        except:
            sqlplugind_data = '0'
            pass
        sqlpg_list = sqlplugind_data.split()


        TopDataDict['fortilogd'] = '0' if (fortilogd_data == '0') else ftd_list[1]
        TopDataDict['sqllogd'] = '0' if (sqllogd_data == '0') else sqld_list[1]
        TopDataDict['sqlplugind'] = '0' if (sqlplugind_data == '0') else sqlpg_list[1]

        #partern for cpu usage:
        return TopDataDict


    def getFortilogd(self):
    # now use telnet to call load image command in faz:


        try:
            tn = telnetlib.Telnet(self.faz_ip)
        except:
            print '\n******************************************************************'
            print "Can not open host,Pls make sure you can telnet the FA used your PC"
            print '******************************************************************\n'
            return 'connect to FAZ error'
        tn.read_until("login:", 10)
        tn.write(str(self.username) + "\n")
        tn.read_until("Password:", 5)
        tn.write(str(self.passwd) + "\n\n")
        Device_name = tn.expect(['#'])[2]
        #print Device_name
        tn.read_until("#", 5)
        cmd = 'diag fortilogd msgrate'
        tn.write(cmd + "\n")
        time.sleep(0.1)

        tn.write("exit\n")
        rs = str(tn.read_all()).rstrip('\r')

        '''  sample output:
            msgs/sec: 674.6, msgs/30sec: 669.5, msgs/60sec: 630.6
        '''
        #remove ','
        rs = rs.replace(',','')
        rs = rs.replace('diag fortilogd msgrate','')
        data = rs.split()[1]
        return data

    def getSqlplugind(self):
        # now use telnet to call load image command in faz:
            try:
                tn = telnetlib.Telnet(self.faz_ip)
            except:
                print '\n******************************************************************'
                print "Can not open host,Pls make sure you can telnet the FA used your PC"
                print '******************************************************************\n'
                return 'connect to FAZ error'
            tn.read_until("login:", 10)
            tn.write(str(self.username) + "\n")
            tn.read_until("Password:", 5)
            tn.write(str(self.passwd) + "\n\n")
            Device_name = tn.expect(['#'])[2]
            #print Device_name
            tn.read_until("#", 5)
            cmd = 'diag debug en'
            tn.write(cmd + "\n")
            time.sleep(0.1)
            cmd = 'diag sql status sqlplugind'
            tn.write(cmd + "\n")
            time.sleep(0.1)
            tn.write("exit\n")
            rs = str(tn.read_all()).rstrip('\r')

            '''  sample output:

                FAZVM #
                PID: 470
                Thread registered: 2
                Log insert speed: logs/5sec: 581.4, logs/60sec: 1238.9  Overall: 1120.8 (7712076)
                Log received: 7716961
                hashtab: new=20 hits=64071
                logtab:  new=125 completed=18 orphan=0 zombie=0
                tri_force=78

                sqldata: batch=64013 insert=0 update=0
                         dup_batch=0 invalid_sql=0
                defer_task: num=0 sent=0

                recv_conn: accept=1 close=0
                close_conn: idle=2332 threshold=0 all_threshold=0

                tsm-nodes: num_in_period=30 num_compl_in_period=0
                           num_prd_new=0 num_prd_new_compl=0 num_stale=20
                           num_total_add=126 num_total_remove=96
                tsm-tlog-timespan: curr=102907 sqldbconf=100800 opcode=1 ratio=1
                sqldb-change-req: 2013-07-30 16:03:04 opcode=2 ratio=3
            '''
            pattern = 'logs/5sec:.*logs/60sec'
            data = re.search(pattern,rs).group(0).replace('logs/5sec','').replace('logs/60sec','')
            #remove ','
            data = data.replace(',','').replace(' ','').replace(':','')

            return data
