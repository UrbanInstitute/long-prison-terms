import csv

cr = csv.reader(open("introData.csv","rU"))
cw = csv.writer(open("lineData.csv","wb"))

cw.writerow(["step","time","count"])

popData = {}
head = cr.next()
for row in cr:
	if float(row[2]) == 0:
		continue
	if int(row[3]) not in popData:
		popData[int(row[3])] = []
	popData[int(row[3])].append({"admission": float(row[0]), "lengthOfStay": float(row[2]) })

# print popData
# 8.712x = 1011

for backwards in range(0,5):
	step = 7 - backwards
	for i in range(0,100):
		t  = i/11.393
		count = 0
		for obj in popData[step]:
			if(t  > obj["admission"] and t < (obj["admission"] + obj["lengthOfStay"]) ):
				count += 1
		if ( (step == 5 and i > 51) or (step == 6 and i > 77) ):
			break
		if step == 3:
			print count, t, obj["admission"]
		cw.writerow([step, t, count])
	
