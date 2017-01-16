from miditime.miditime import MIDITime
from random import randrange, random

print randrange(0,10)

def mag_to_pitch_tuned(magnitude):
    # Where does this data point sit in the domain of your data? (I.E. the min magnitude is 3, the max in 5.6). In this case the optional 'True' means the scale is reversed, so the highest value will return the lowest percentage.
    scale_pct = short.linear_scale_pct(0, 10, magnitude)

    # Another option: Linear scale, reverse order
    # scale_pct = short.linear_scale_pct(3, 5.7, magnitude, True)

    # Another option: Logarithmic scale, reverse order
    # scale_pct = short.log_scale_pct(3, 5.7, magnitude, True)

    # Pick a range of notes. This allows you to play in a key.
    c_major = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

    #Find the note that matches your data point
    note = short.scale_to_note(scale_pct, c_major)

    #Translate that note to a MIDI pitch
    midi_pitch = short.note_to_midi_pitch(note)

    return midi_pitch





short = MIDITime(120, 'short.mid')

longer = MIDITime(120, 'longer.mid')

shortnotes = []
longernotes = []
for i in range(0, 20):
	note = []
	start = random() * i
	pitch = mag_to_pitch_tuned(randrange(0,10))
	duration = 2
	attack = 100	
	note = [start, pitch, attack, duration]
	longnote = [start, pitch, attack, 10]
	longernotes.append(longnote)
	shortnotes.append(note)

# Create a list of notes. Each note is a list: [time, pitch, attack, duration]
# midinotes = [
#     [0, 60, 200, 3],  #At 0 beats (the start), Middle C with attack 200, for 3 beats
#     [10, 61, 200, 4]  #At 10 beats (12 seconds from start), C#5 with attack 200, for 4 beats
# ]

# Add a track with those notes
short.add_track(shortnotes)
longer.add_track(longernotes)

# Output the .mid file
short.save_midi()
longer.save_midi()