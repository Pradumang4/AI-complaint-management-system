from transformers import pipeline

classifier = pipeline("zero-shot-classification")
sentiment = pipeline("sentiment-analysis")

labels = [
    "maintenance",
    "electrical issue",
    "water problem",
    "internet issue",
    "hostel issue"
]

def analyze_complaint(text):
    # category
    category_result = classifier(text, labels)
    category = str(category_result["labels"][0])   # ✅ force string

    # sentiment
    sentiment_result = sentiment(text)[0]["label"]
    sentiment_label = str(sentiment_result)        # ✅ force string

    # priority logic
    priority = "Low"
    if sentiment_label == "NEGATIVE":
        priority = "High"

    return {
        "category": category,
        "sentiment": sentiment_label,
        "priority": priority
    }
