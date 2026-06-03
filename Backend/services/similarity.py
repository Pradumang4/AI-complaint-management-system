from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def is_duplicate(new_text, old_texts):
    if not old_texts:
        return False

    texts = old_texts + [new_text]

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts)

    similarity = cosine_similarity(vectors[-1], vectors[:-1])

    return similarity.max() > 0.7
