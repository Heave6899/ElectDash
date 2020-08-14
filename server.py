import paho.mqtt.client as mqtt
from datetime import timedelta, datetime, tzinfo, timezone
import time
import random
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    
    # string = " " + b + " "+c +" "+ d+ " "+e +" "+ f
    # client.publish("wxstation/wind_speed",string)

# filename1 = os.getcwd() + "\\18-07-20.xlsx"
# wb2 = xl.load_workbook(filename1) 
# ws2 = wb2.active

client = mqtt.Client()
client.on_connect = on_connect
client.connect("broker.hivemq.com", 1883, 60)
client.loop_start()

while True:  
    # reading cell value from source excel file 
        #print(c)
        a = time.localtime()
        a = time.strftime("%H:%M:%S", a)
        a = str(a)
        b = str(random.uniform(2,6))
        c = str(random.uniform(10,15))
        d = str(random.uniform(12,95))
        e = str(random.uniform(0.5,0.6))
        f = str(random.uniform(2,5))
        print(a,b)
        client.publish("pibpump/a",a + " " + d + " "  + b + " " + c + " " + e + " " + f)
        client.publish("pibpump/e",a + " " + d + " "  + b + " " + c + " " + e + " " + f)
        client.publish("pibpump/c",a + " " + d + " "  + b + " " + c + " " + e + " " + f)
        

        time.sleep(1)