
# Custom  modules
from .models import *

''' Functions to abstract some of the basic sorting and searching that is being done ''' 
def search_filter_by_text(Product, queryset, search_query):
    
    # Filter in names and descriptions
    names = queryset.filter(name__icontains=search_query)
    descriptions = queryset.filter(description__icontains=search_query)

    # Iterate through the names and get all ids 
    ids = []
    for i in range(len(names)):
        ids.append(names[i].id)
        print(type(names[i].id), print(type(names[i])))
    
    # iterate through descriptions 
    for i in range(len(descriptions)): 
        if descriptions[i].id not in ids:
            ids.append(descriptions[i].id)
    
    queryset = Product.objects.filter(id__in=ids)

    return queryset