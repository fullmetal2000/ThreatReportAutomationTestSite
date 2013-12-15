import ctypes

c_uint8 = ctypes.c_uint8



class Packet():
    header = Packet_head()

class Packet_head():
    magic = 0xef
    hostname_len = 0 #hostname len
    total_len = 1000
    mapping_len = 0
    timezone = 0x0f
    SN = 'FG200B9999999999'
    nr_msgs = 2
    #hostname


class Packet(ctypes.Structure):
    _fields_ = [('header', PacketHeader),
                ('mapping', Mapping),
                ('message', message)
    ]

class PacketHeader(ctypes.Structure):
    _fields_ = [('magic', ctypes.c_byte),
                ('hostname_len',ctypes.c_byte)
                ('total_len',2*ctypes.c_byte)
                ('mapping_len',2*ctypes.c_byte)
                ('timezone',ctypes.c_byte)
                ('SN',16*ctypes.c_byte)
                ('nr_msgs',ctypes.c_byte)
                ('devicename',16*ctypes.c_byte)
    ]

class mapping(ctypes.Structure):
    _fields_= [('length', ctypes.c_byte),
               ('opaque', ctypes.c_byte),
    ]


# class Flags_bits(ctypes.LittleEndianStructure):
#     _fields_ = [
#
#
#         ("idle", c_uint8, 1),
#         ]
#
# class Flags(ctypes.Union):
#     _fields_ = [("c", Flags_bits), ("abyte", c_uint8)]
#
# flags = Flags()
# flags.abyte = 0x0
# print(flags.c.idle)
# print(hex(flags.abyte))

