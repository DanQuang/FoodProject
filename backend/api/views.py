import PIL.Image
from django.shortcuts import render
import google.generativeai as genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import FoodImageSerializer
import PIL
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

class ProcessImageView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.parser_classes = (MultiPartParser, FormParser)
        self.model = genai.GenerativeModel("gemini-1.5-flash-latest",
                                safety_settings={
                                    'HATE': 'BLOCK_NONE',
                                    'HARASSMENT': 'BLOCK_NONE',
                                    'SEXUAL' : 'BLOCK_NONE',
                                    'DANGEROUS' : 'BLOCK_NONE'
                                })

    def post(self, request, *args, **kwargs):
        serializer = FoodImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            image_path = serializer.data['image']
            img = PIL.Image.open(f"D:/Projects/FoodProject/backend{image_path}")
            # Send the image to the LLM API (e.g., OpenAI or another API)
            try:
                # Example API call
                prompt = "List the ingredients in this dish, one ingredient per line. Example: \
                            Image: Hamburger \
                            Ingredients: \
                            Beef \
                            Tomato \
                            ..."
                response = self.model.generate_content([prompt, img])
                new_response = {
                    'ingredients': f'{response.text}'
                }
                return Response(new_response, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)