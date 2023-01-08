import nltk
import openai
import pyttsx3
import speech_recognition as sr
from api_secret import API_KEY
from test_questions import QUESTIONS
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
nltk.download('averaged_perceptron_tagger')

app = Flask(__name__)
CORS(app)
# api.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

# @app.route('/getData', methods=['POST', 'GET', 'OPTIONS'])
def get_path():
    print("in get path")
    #print(request.args.get('name'))
    # return request.get_json()
    return {"message": "good"}

key = 0
questions_started = False
test_start = False
test_end = False
speech = sr.Recognizer()
openai.api_key = API_KEY
engine = pyttsx3.init()
convo = ""
user_name = "Zaid"
count_of_a = 0
count_of_b = 0
ans_matched = False
problem = "I am sorry I did not understand your answer! Can you please try to answer again?"
dichotomy = ""
problem_encountered = False
no_encountered = False

def synonymExtractor(phrase):
    synonyms = []

    for syn in wordnet.synsets(phrase):
        for l in syn.lemmas():
            synonyms.append(l.name())

    #print(synonyms)
    return synonyms

def selectMicrophone():
    mic = sr.Microphone(device_index=2)

    print(sr.Microphone.list_microphone_names())

    return mic

def listenforUser(mic):
    with mic as source:
        print("listening...")
        speech.adjust_for_ambient_noise(source, duration=0.2)
        audio = speech.listen(source)
    print("processing...")

    return audio


def inputText():
    text = input()
    return text

def sixteenPersonalityTest(QUESTIONS, engine, key, convo):
    global questions_started
    # if not questions_started:
        # print("The Personality Test is starting now! Please give concise and to the point answers to the following questions")
        # engine.say("The Personality Test is starting now! Please give concise and to the point answers to the following questions")
        #questions_started = True
    print("Personicoder:", QUESTIONS[key][0])
    response_str = {"message":QUESTIONS[key][0]}
    engine.say(QUESTIONS[key])
    convo += "Personicoder: " + QUESTIONS[key][0] + "\n"

    return response_str

#@app.route('/getData', methods=['POST', 'GET', 'OPTIONS'])
def getResponse():
    global convo
    input = request.args.get('message')
    prompt = "\nuser_name" + " : " + input + "\nPersonicoder: "
    convo += prompt

    response = openai.Completion.create(engine="text-davinci-001", prompt=convo, max_tokens=50)
    response_str = response["choices"][0]["text"].replace("\n", "")
    response_str = response_str.split("user_name" + ": ", 1)[0].split("Personicoder: ", 1)[0]

    convo += response_str + "\n"
    print(convo)
    get_path()

    # return response_str
    return {"message": response_str}

def possibleAnswers(QUESTIONS, key):
    possAns = ["Yes", "Yeah", "Sure"]
    final_poss_ans = []

    tokens = word_tokenize(QUESTIONS[key][0])
    print("in possAns")
    pos_tokens = nltk.pos_tag(tokens)
    #print(nltk.pos_tag(tokens))
    for token in pos_tokens:
        if token[1] == "NN" or token[1] == "NNP" or token[1] == "NNS" or token[1] == "VB":
            possAns.append(token[0])

    for ans in possAns:
            final_poss_ans += synonymExtractor(ans)
    #print(final_poss_ans)

    return final_poss_ans

@app.route('/getData', methods=['POST', 'GET', 'OPTIONS'])
def response():
    global convo
    global key
    global count_of_b
    global count_of_a
    global dichotomy
    global test_start
    global test_end
    global engine
    global problem_encountered
    global ans_matched
    global no_encountered
    global user_name

    print(key)
    input = request.args.get('message')
    convo += user_name + ": " + input
    if test_start == False and test_end == True:
        f = open("report.txt", "a")
        f.write("Name: " + user_name +"\n")
        f.write("Personality Type:" + dichotomy + "\n")
        f.write("Test Record of Questions and user answers:\n")
        f.write(convo)
        f.close()
        response_str = getResponse()
        engine.say(response_str)
        convo += "Personicoder: " + response_str["message"] + "\n"
    elif test_start == False and test_end == False:
        for word in synonymExtractor("start"):
            if input.find(word) != -1 or input.find("want to") != 1:
                for word2 in synonymExtractor("test"):
                    if input.find(word2) != -1:
                        test_start = True
                        print("here")
                        break

            if test_start:
                break
        if test_start:
            """Test Started"""
            questions_started = True
            # print(QUESTIONS[key][0])
            # response_str = {"message":QUESTIONS[key][0], "key":key}
            # engine.say(QUESTIONS[key])
            print("The Personality Test is starting now! Please give concise and to the point answers to the following questions\n", QUESTIONS[key][0])
            engine.say("The Personality Test is starting now! Please give concise and to the point answers to the following questions")
            response_str = {"message": "The Personality Test is starting now! Please give concise and to the point answers to the following questions: " + QUESTIONS[key][0]}
            convo += "Personicoder: The Personality Test is starting now! Please give concise and to the point answers to the following questions\n" + QUESTIONS[key][0]
            # key += 1
        else:
            response_str = getResponse()
            engine.say(response_str)
            convo += "Personicoder: " + response_str['message'] + "\n"
    elif test_start == True and test_end == False:
        # Personality Test implemented in
        print("here2")
        if key == 10:
            if count_of_a > count_of_b:
                dichotomy = dichotomy + "E"
            else:
                dichotomy = dichotomy + "I"
            response_str = {"message" : ""}
        elif key == 20:
            if count_of_a > count_of_b:
                dichotomy = dichotomy + "S"
            else:
                dichotomy = dichotomy + "N"
            response_str = {"message" : ""}
        elif key == 30:
            if count_of_a > count_of_b:
                dichotomy = dichotomy + "T"
            else:
                dichotomy = dichotomy + "F"
            response_str = {"message" : ""}
        elif key == 39:
            if count_of_a > count_of_b:
                dichotomy = dichotomy + "J"
            else:
                dichotomy = dichotomy + "P"
            test_start = False
            test_end = True
            response_str = {"message" : "Thank you for taking the test.Your personality type is:" + dichotomy}
        elif key < 40:
            print(key)
            if key % 2 == 1:
                poss = possibleAnswers(QUESTIONS, key)
                print(input)
                for ans in poss:
                    #print(ans)
                    if input.find("No") != -1 or input.find("Not") != -1:
                        print("No encountered odd")
                        no_encountered = True
                        response_str = {"message" : ""}
                        break
                    elif ans.lower() in input.lower():
                        count_of_a += 1
                        response_str = {"message": ""}
                        print("count of a increased by:", count_of_a)
                        ans_matched = True
                        break
                print("ans_matched:", ans_matched, "no_encountered:", no_encountered)
                if ans_matched == False and no_encountered == False:
                    print("Personicoder: " + problem + "\n")
                    response_str = {"message" : problem}
                    engine.say(problem)
                    convo += "Personicoder: " + problem + "\n"
                    problem_encountered = True
                    key -= 1
                    
                    # else:
                        # print("Personicoder: " + problem + "\n")
                        # response_str = {"message" : problem}
                        # engine.say(problem)
                        # convo += "Personicoder: " + problem + "\n"
                        # problem_encountered = True
                        # key -= 1
                        # break
                if problem_encountered:
                    problem_encountered = False
            else:
                print("in else part now")
                poss = possibleAnswers(QUESTIONS, key)
                #print(poss)
                for ans in poss:
                    print(ans)
                    #print(input)
                    if input.find("No") != -1 or input.find("Not") != -1:
                        print("No encountered even")
                        no_encountered = True
                        response_str = {"message" : ""}
                        break
                    if ans.lower() in input.lower():
                        count_of_b += 1
                        response_str = {"message" : ""}
                        print("count of b increased by:", count_of_b)
                        ans_matched = True
                        break
                if ans_matched == False and no_encountered == False:
                    print("Personicoder: " + problem + "\n")
                    response_str = {"message":problem}
                    engine.say(problem)
                    convo += "Personicoder: " + problem + "\n"
                    problem_encountered = True
                    key -= 1

                    # else:
                        # print("Personicoder: " + problem + "\n")
                        # response_str = {"message":problem}
                        # engine.say(problem)
                        # convo += "Personicoder: " + problem + "\n"
                        # problem_encountered = True
                        # key -= 1
                        # break
                if problem_encountered:
                    problem_encountered = False

        key += 1
    
    if response_str["message"] == "" or response_str["message"] == problem:
        response_str = sixteenPersonalityTest(QUESTIONS, engine, key, convo)
    ans_matched = False
    no_encountered = False
    # print("user_name", ":", input)

    return response_str

# def main():
#     global input
#     mic = selectMicrophone()

#     print("When you are ready to take the test, feel free to ask")

#     # audio = listenforUser(mic)
#     # try:
#     #     input = speech.recognize_google(audio)
#     #     convo += user_name + ": " + input + "\n"
#     # except:
#     #     print("abcd")
#     input = inputText()
#     response_str = response(input)
#     print(response_str)

#     engine.runAndWait()

#     return response_str