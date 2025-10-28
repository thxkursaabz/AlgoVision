// Types for sorting animations
export type ArrayElement = {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'pivot' | 'active';
};

export type SortingAnimation = {
  array: ArrayElement[];  
  comparisons: number;
  swaps: number;
  description: string;
};

// Helper function to create a default array
export const createArray = (length: number, min: number = 5, max: number = 100): ArrayElement[] => {
  return Array.from({ length }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    state: 'default'
  }));
};

// Helper function to create nearly sorted array
export const createNearlySortedArray = (length: number, swapCount: number = 5): ArrayElement[] => {
  const arr = Array.from({ length }, (_, i) => ({
    value: i + 5,
    state: 'default'
  }));
  
  // Perform a few random swaps
  for (let i = 0; i < swapCount; i++) {
    const idx1 = Math.floor(Math.random() * length);
    const idx2 = Math.floor(Math.random() * length);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }
  
  return arr;
};

// Helper function to create reversed array
export const createReversedArray = (length: number): ArrayElement[] => {
  return Array.from({ length }, (_, i) => ({
    value: length - i + 5,
    state: 'default'
  }));
};

// Helper function to create few unique values array
export const createFewUniqueArray = (length: number, uniqueCount: number = 5): ArrayElement[] => {
  const uniqueValues = Array.from({ length: uniqueCount }, (_, i) => 
    Math.floor((i + 1) * (100 / uniqueCount))
  );
  
  return Array.from({ length }, () => ({
    value: uniqueValues[Math.floor(Math.random() * uniqueCount)],
    state: 'default'
  }));
};

// Bubble Sort
export const bubbleSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      array[j].state = 'comparing';
      array[j + 1].state = 'comparing';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing elements at indices ${j} and ${j + 1}`
      });
      
      // Swap if needed
      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Swapping elements at indices ${j} and ${j + 1}`
        });
      }
      
      // Reset state
      array[j].state = 'default';
      array[j + 1].state = 'default';
    }
    
    // Mark the last element as sorted
    array[n - i - 1].state = 'sorted';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Element at index ${n - i - 1} is now in its sorted position`
    });
  }
  
  // Mark the first element as sorted
  array[0].state = 'sorted';
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Selection Sort
export const selectionSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    array[i].state = 'active';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Finding minimum element starting from index ${i}`
    });
    
    for (let j = i + 1; j < n; j++) {
      array[j].state = 'comparing';
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing with element at index ${j}`
      });
      
      comparisons++;
      
      if (array[j].value < array[minIdx].value) {
        if (minIdx !== i) {
          array[minIdx].state = 'default';
        }
        minIdx = j;
        array[minIdx].state = 'active';
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Found new minimum at index ${j}`
        });
      }
      
      if (j !== minIdx) {
        array[j].state = 'default';
      }
    }
    
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      swaps++;
      
      array[minIdx].state = 'default';
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Swapping elements at indices ${i} and ${minIdx}`
      });
    }
    
    array[i].state = 'sorted';
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Element at index ${i} is now in its sorted position`
    });
  }
  
  array[n - 1].state = 'sorted';
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Insertion Sort
export const insertionSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Mark first element as sorted
  array[0].state = 'sorted';
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'First element is already sorted'
  });
  
  for (let i = 1; i < n; i++) {
    const key = array[i];
    array[i].state = 'active';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Inserting element at index ${i}`
    });
    
    let j = i - 1;
    
    while (j >= 0) {
      array[j].state = 'comparing';
      comparisons++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing with element at index ${j}`
      });
      
      if (array[j].value > key.value) {
        array[j + 1] = array[j];
        swaps++;
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Moving element at index ${j} to index ${j + 1}`
        });
        
        j--;
      } else {
        array[j].state = 'sorted';
        break;
      }
      
      array[j + 1].state = 'sorted';
    }
    
    array[j + 1] = key;
    array[j + 1].state = 'sorted';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Inserted element at index ${j + 1}`
    });
  }
  
  return animations;
};

// Quick Sort
export const quickSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const partition = (arr: ArrayElement[], low: number, high: number): number => {
    const pivot = arr[high];
    arr[high].state = 'pivot';
    
    animations.push({
      array: JSON.parse(JSON.stringify(arr)),
      comparisons,
      swaps,
      description: `Choosing pivot at index ${high}`
    });
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      arr[j].state = 'comparing';
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Comparing element at index ${j} with pivot`
      });
      
      comparisons++;
      
      if (arr[j].value <= pivot.value) {
        i++;
        
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          
          animations.push({
            array: JSON.parse(JSON.stringify(arr)),
            comparisons,
            swaps,
            description: `Swapping elements at indices ${i} and ${j}`
          });
        }
      }
      
      arr[j].state = 'default';
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    
    arr[i + 1].state = 'sorted';
    arr[high].state = 'default';
    
    animations.push({
      array: JSON.parse(JSON.stringify(arr)),
      comparisons,
      swaps,
      description: `Placing pivot at its correct position (index ${i + 1})`
    });
    
    return i + 1;
  };
  
  const quickSortHelper = (arr: ArrayElement[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    } else if (low === high) {
      arr[low].state = 'sorted';
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Element at index ${low} is in its sorted position`
      });
    }
  };
  
  quickSortHelper(array, 0, array.length - 1);
  
  // Mark all elements as sorted at the end
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Merge Sort
export const mergeSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const merge = (arr: ArrayElement[], l: number, m: number, r: number) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    
    // Create temp arrays
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);
    
    // Highlight the subarrays being merged
    for (let i = l; i <= r; i++) {
      arr[i].state = i <= m ? 'comparing' : 'active';
    }
    
    animations.push({
      array: JSON.parse(JSON.stringify(arr)),
      comparisons,
      swaps,
      description: `Merging subarrays from index ${l} to ${m} and ${m + 1} to ${r}`
    });
    
    // Merge the temp arrays back
    let i = 0, j = 0, k = l;
    
    while (i < n1 && j < n2) {
      comparisons++;
      
      if (L[i].value <= R[j].value) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
        swaps++;
      }
      
      arr[k].state = 'sorted';
      k++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Placing element at index ${k - 1}`
      });
    }
    
    // Copy remaining elements
    while (i < n1) {
      arr[k] = L[i];
      arr[k].state = 'sorted';
      i++;
      k++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Copying remaining element from left subarray to index ${k - 1}`
      });
    }
    
    while (j < n2) {
      arr[k] = R[j];
      arr[k].state = 'sorted';
      j++;
      k++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Copying remaining element from right subarray to index ${k - 1}`
      });
    }
  };
  
  const mergeSortHelper = (arr: ArrayElement[], l: number, r: number) => {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      
      mergeSortHelper(arr, l, m);
      mergeSortHelper(arr, m + 1, r);
      
      merge(arr, l, m, r);
    }
  };
  
  mergeSortHelper(array, 0, array.length - 1);
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Shell Sort
export const shellSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Generate gap sequence (using Shell's original sequence)
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Using gap size of ${gap}`
    });
    
    for (let i = gap; i < n; i++) {
      // Save the current element
      const temp = array[i];
      array[i].state = 'active';
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Considering element at index ${i}`
      });
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      let j;
      for (j = i; j >= gap; j -= gap) {
        array[j - gap].state = 'comparing';
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Comparing with element at index ${j - gap}`
        });
        
        comparisons++;
        
        if (array[j - gap].value > temp.value) {
          array[j] = JSON.parse(JSON.stringify(array[j - gap]));
          array[j].state = 'default';
          swaps++;
          
          animations.push({
            array: JSON.parse(JSON.stringify(array)),
            comparisons,
            swaps,
            description: `Moving element from index ${j - gap} to index ${j}`
          });
        } else {
          array[j - gap].state = 'default';
          break;
        }
        
        array[j - gap].state = 'default';
      }
      
      // Put temp in its correct location
      array[j] = JSON.parse(JSON.stringify(temp));
      array[j].state = 'default';
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Placing element at index ${j}`
      });
    }
    
    // Reduce the gap for the next iteration
    gap = Math.floor(gap / 2);
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Counting Sort
export const countingSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Find the maximum element
  let max = array[0].value;
  for (let i = 1; i < n; i++) {
    array[i].state = 'comparing';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Finding maximum value, checking element at index ${i}`
    });
    
    comparisons++;
    
    if (array[i].value > max) {
      max = array[i].value;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `New maximum value found: ${max}`
      });
    }
    
    array[i].state = 'default';
  }
  
  // Create a count array
  const count = new Array(max + 1).fill(0);
  
  // Store the count of each element
  for (let i = 0; i < n; i++) {
    array[i].state = 'active';
    count[array[i].value]++;
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Counting occurrences of value ${array[i].value}`
    });
    
    array[i].state = 'default';
  }
  
  // Store cumulative count
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Calculating cumulative count for value ${i}: ${count[i]}`
    });
  }
  
  // Build the output array
  const output = new Array(n).fill(null).map(() => ({ value: 0, state: 'default' }));
  
  // Place elements in sorted order
  for (let i = n - 1; i >= 0; i--) {
    array[i].state = 'active';
    
    const index = count[array[i].value] - 1;
    output[index] = { value: array[i].value, state: 'sorted' };
    count[array[i].value]--;
    
    // Create a copy of the array for animation
    const animationArray = array.map((el, idx) => {
      if (idx === i) return { ...el, state: 'active' };
      return { ...el, state: 'default' };
    });
    
    // Replace elements that have been placed in output
    for (let j = 0; j < n; j++) {
      if (output[j] && output[j].state === 'sorted') {
        animationArray[j] = { ...output[j] };
      }
    }
    
    swaps++;
    
    animations.push({
      array: JSON.parse(JSON.stringify(animationArray)),
      comparisons,
      swaps,
      description: `Placing value ${array[i].value} at index ${index} in sorted array`
    });
    
    array[i].state = 'default';
  }
  
  // Copy the output array to the original array
  for (let i = 0; i < n; i++) {
    array[i] = { ...output[i], state: 'sorted' };
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Bucket Sort
export const bucketSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Find the maximum and minimum values
  let max = array[0].value;
  let min = array[0].value;
  
  for (let i = 1; i < n; i++) {
    array[i].state = 'comparing';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Finding min/max values, checking element at index ${i}`
    });
    
    comparisons++;
    
    if (array[i].value > max) {
      max = array[i].value;
    }
    
    if (array[i].value < min) {
      min = array[i].value;
    }
    
    array[i].state = 'default';
  }
  
  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);
  const buckets: ArrayElement[][] = Array.from({ length: bucketCount }, () => []);
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: `Created ${bucketCount} buckets with size ${bucketSize}`
  });
  
  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    array[i].state = 'active';
    
    const bucketIndex = Math.floor((array[i].value - min) / bucketSize);
    buckets[bucketIndex].push({ ...array[i], state: 'default' });
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Placing value ${array[i].value} in bucket ${bucketIndex}`
    });
    
    array[i].state = 'default';
  }
  
  // Sort individual buckets (using insertion sort)
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Sorting bucket ${i} with ${buckets[i].length} elements`
    });
    
    // Insertion sort for each bucket
    for (let j = 1; j < buckets[i].length; j++) {
      const key = { ...buckets[i][j] };
      let k = j - 1;
      
      while (k >= 0 && buckets[i][k].value > key.value) {
        comparisons++;
        buckets[i][k + 1] = { ...buckets[i][k] };
        k--;
        swaps++;
      }
      
      buckets[i][k + 1] = key;
    }
    
    // Place sorted elements back into the array
    for (let j = 0; j < buckets[i].length; j++) {
      array[index] = { ...buckets[i][j], state: 'sorted' };
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Placing sorted element from bucket ${i} at index ${index}`
      });
      
      index++;
    }
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Cocktail Shaker Sort
export const cocktailShakerSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    // Reset swapped flag for forward pass
    swapped = false;
    
    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      array[i].state = 'comparing';
      array[i + 1].state = 'comparing';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Forward pass: Comparing elements at indices ${i} and ${i + 1}`
      });
      
      if (array[i].value > array[i + 1].value) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        swaps++;
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Forward pass: Swapping elements at indices ${i} and ${i + 1}`
        });
      }
      
      array[i].state = 'default';
      array[i + 1].state = 'default';
    }
    
    // If no swapping occurred in forward pass, array is sorted
    if (!swapped) {
      break;
    }
    
    // Mark the last element as sorted
    array[end].state = 'sorted';
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Element at index ${end} is now in its sorted position`
    });
    
    // Decrement end as the largest element is now at the end
    end--;
    
    // Reset swapped flag for backward pass
    swapped = false;
    
    // Backward pass (right to left)
    for (let i = end; i >= start; i--) {
      if (i > 0) {
        array[i].state = 'comparing';
        array[i - 1].state = 'comparing';
        
        comparisons++;
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Backward pass: Comparing elements at indices ${i - 1} and ${i}`
        });
        
        if (array[i - 1].value > array[i].value) {
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
          swapped = true;
          swaps++;
          
          animations.push({
            array: JSON.parse(JSON.stringify(array)),
            comparisons,
            swaps,
            description: `Backward pass: Swapping elements at indices ${i - 1} and ${i}`
          });
        }
        
        array[i].state = 'default';
        array[i - 1].state = 'default';
      }
    }
    
    // Mark the first element as sorted
    array[start].state = 'sorted';
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Element at index ${start} is now in its sorted position`
    });
    
    // Increment start as the smallest element is now at the beginning
    start++;
  }
  
  // Mark all remaining elements as sorted
  for (let i = start; i <= end; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Cycle Sort
export const cycleSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Loop through the array to find cycles
  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = array[cycleStart];
    
    // Find position where the element should be placed
    let pos = cycleStart;
    
    for (let i = cycleStart + 1; i < n; i++) {
      array[i].state = 'comparing';
      array[cycleStart].state = 'active';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing ${array[cycleStart].value} with ${array[i].value}`
      });
      
      if (array[i].value < item.value) {
        pos++;
      }
      
      array[i].state = 'default';
    }
    
    // If the element is already in the correct position
    if (pos === cycleStart) {
      array[cycleStart].state = 'sorted';
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Element ${item.value} is already in the correct position`
      });
      continue;
    }
    
    // Put the item in its correct position
    while (item.value === array[pos].value) {
      pos++;
    }
    
    // Swap
    if (pos !== cycleStart) {
      [array[pos], item] = [item, array[pos]];
      swaps++;
      
      array[pos].state = 'sorted';
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Placing ${array[pos].value} in its correct position at index ${pos}`
      });
    }
    
    // Rotate the rest of the cycle
    while (pos !== cycleStart) {
      pos = cycleStart;
      
      // Find position where element should go
      for (let i = cycleStart + 1; i < n; i++) {
        array[i].state = 'comparing';
        
        comparisons++;
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Finding position for ${item.value}, comparing with ${array[i].value}`
        });
        
        if (array[i].value < item.value) {
          pos++;
        }
        
        array[i].state = 'default';
      }
      
      // Skip duplicates
      while (item.value === array[pos].value) {
        pos++;
      }
      
      // Swap
      if (item.value !== array[pos].value) {
        [array[pos], item] = [item, array[pos]];
        swaps++;
        
        array[pos].state = 'sorted';
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Placing ${array[pos].value} in its correct position at index ${pos}`
        });
      }
    }
  }
  
  // Mark the last element as sorted
  array[n - 1].state = 'sorted';
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Gnome Sort
export const gnomeSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  let index = 0;
  
  while (index < n) {
    // If at the start of the array or current element is greater than or equal to previous
    if (index === 0 || array[index].value >= array[index - 1].value) {
      if (index > 0) {
        array[index].state = 'comparing';
        array[index - 1].state = 'comparing';
        
        comparisons++;
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Comparing ${array[index].value} with ${array[index - 1].value}`
        });
        
        array[index].state = 'default';
        array[index - 1].state = 'default';
      }
      
      // Move forward
      index++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Gnome moving forward to index ${index}`
      });
    } else {
      // If current element is less than previous, swap them
      array[index].state = 'comparing';
      array[index - 1].state = 'comparing';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing ${array[index].value} with ${array[index - 1].value}`
      });
      
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      swaps++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Swapping ${array[index].value} with ${array[index - 1].value}`
      });
      
      array[index].state = 'default';
      array[index - 1].state = 'default';
      
      // Move backward
      index--;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Gnome moving backward to index ${index}`
      });
    }
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Bogo Sort
export const bogoSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Function to check if array is sorted
  const isSorted = (arr: ArrayElement[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      comparisons++;
      if (arr[i - 1].value > arr[i].value) {
        return false;
      }
    }
    return true;
  };
  
  // Function to shuffle array randomly
  const shuffle = (arr: ArrayElement[]): void => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].state = 'active';
    }
    
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++;
    }
    
    for (let i = 0; i < arr.length; i++) {
      arr[i].state = 'default';
    }
  };
  
  // Limit the number of iterations to prevent infinite loops
  const MAX_ITERATIONS = 20;
  let iterations = 0;
  
  // Keep shuffling until the array is sorted or max iterations reached
  while (!isSorted(array) && iterations < MAX_ITERATIONS) {
    // Check if array is sorted
    let sorted = true;
    for (let i = 1; i < n; i++) {
      array[i].state = 'comparing';
      array[i - 1].state = 'comparing';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Checking if array is sorted, comparing ${array[i - 1].value} with ${array[i].value}`
      });
      
      if (array[i - 1].value > array[i].value) {
        sorted = false;
      }
      
      array[i].state = 'default';
      array[i - 1].state = 'default';
    }
    
    if (sorted) {
      break;
    }
    
    // Shuffle the array
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Array not sorted, performing random shuffle (attempt ${iterations + 1})`
    });
    
    shuffle(array);
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Completed random shuffle (attempt ${iterations + 1})`
    });
    
    iterations++;
  }
  
  // Mark all elements as sorted if successful
  if (iterations < MAX_ITERATIONS) {
    for (let i = 0; i < n; i++) {
      array[i].state = 'sorted';
    }
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: 'Sorting complete'
    });
  } else {
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: 'Maximum iterations reached, stopping Bogo Sort'
    });
  }
  
  return animations;
};

// Tim Sort
export const timSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  const RUN = 32; // Size of subarrays to be sorted using insertion sort
  
  // Sort individual subarrays of size RUN using insertion sort
  for (let i = 0; i < n; i += RUN) {
    const end = Math.min(i + RUN - 1, n - 1);
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Sorting subarray from index ${i} to ${end} using insertion sort`
    });
    
    // Insertion sort for this run
    for (let j = i + 1; j <= end; j++) {
      const key = { ...array[j] };
      let k = j - 1;
      
      array[j].state = 'active';
      
      while (k >= i && array[k].value > key.value) {
        array[k].state = 'comparing';
        
        comparisons++;
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Comparing ${key.value} with ${array[k].value}`
        });
        
        array[k + 1] = { ...array[k] };
        swaps++;
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Moving ${array[k].value} to index ${k + 1}`
        });
        
        array[k].state = 'default';
        k--;
      }
      
      array[k + 1] = key;
      array[j].state = 'default';
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Placing ${key.value} at index ${k + 1}`
      });
    }
  }
  
  // Merge sorted runs
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      
      if (mid < right) {
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Merging subarrays from index ${left} to ${mid} and ${mid + 1} to ${right}`
        });
        
        // Merge the two runs
        const temp = [];
        let i = left;
        let j = mid + 1;
        
        while (i <= mid && j <= right) {
          array[i].state = 'comparing';
          array[j].state = 'comparing';
          
          comparisons++;
          animations.push({
            array: JSON.parse(JSON.stringify(array)),
            comparisons,
            swaps,
            description: `Comparing ${array[i].value} with ${array[j].value}`
          });
          
          if (array[i].value <= array[j].value) {
            temp.push({ ...array[i] });
            array[i].state = 'default';
            i++;
          } else {
            temp.push({ ...array[j] });
            array[j].state = 'default';
            j++;
          }
        }
        
        // Copy remaining elements
        while (i <= mid) {
          temp.push({ ...array[i] });
          i++;
        }
        
        while (j <= right) {
          temp.push({ ...array[j] });
          j++;
        }
        
        // Copy back to the original array
        for (let k = 0; k < temp.length; k++) {
          array[left + k] = { ...temp[k], state: 'default' };
          swaps++;
          
          if (k % 5 === 0 || k === temp.length - 1) { // Reduce animation frames
            animations.push({
              array: JSON.parse(JSON.stringify(array)),
              comparisons,
              swaps,
              description: `Copying merged elements back to the original array`
            });
          }
        }
      }
    }
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Comb Sort
export const combSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Initialize gap with array length
  let gap = n;
  
  // Set shrink factor
  const shrink = 1.3;
  
  // Initialize swapped as true to enter the loop
  let swapped = true;
  
  // Keep running while gap is more than 1 or swapped is true
  while (gap > 1 || swapped) {
    // Calculate gap using shrink factor
    gap = Math.floor(gap / shrink);
    
    // Ensure minimum gap is 1
    if (gap < 1) {
      gap = 1;
    }
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Using gap size of ${gap}`
    });
    
    swapped = false;
    
    // Compare elements with gap
    for (let i = 0; i + gap < n; i++) {
      array[i].state = 'comparing';
      array[i + gap].state = 'comparing';
      
      comparisons++;
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Comparing elements at indices ${i} and ${i + gap}`
      });
      
      if (array[i].value > array[i + gap].value) {
        [array[i], array[i + gap]] = [array[i + gap], array[i]];
        swapped = true;
        swaps++;
        
        animations.push({
          array: JSON.parse(JSON.stringify(array)),
          comparisons,
          swaps,
          description: `Swapping elements at indices ${i} and ${i + gap}`
        });
      }
      
      array[i].state = 'default';
      array[i + gap].state = 'default';
    }
    
    // If gap is 1 and no swapping occurred, array is sorted
    if (gap === 1 && !swapped) {
      // Mark all elements as sorted
      for (let i = 0; i < n; i++) {
        array[i].state = 'sorted';
      }
    }
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Radix Sort
export const radixSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const n = array.length;
  
  // Find the maximum number to know number of digits
  let max = array[0].value;
  for (let i = 1; i < n; i++) {
    array[i].state = 'comparing';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Finding maximum value, checking element at index ${i}`
    });
    
    comparisons++;
    
    if (array[i].value > max) {
      max = array[i].value;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `New maximum value found: ${max}`
      });
    }
    
    array[i].state = 'default';
  }
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Sorting by digit position: ${exp}`
    });
    
    // Count array for this digit
    const count = new Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
      array[i].state = 'active';
      const digit = Math.floor(array[i].value / exp) % 10;
      count[digit]++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Counting occurrences of digit ${digit} at position ${exp}`
      });
      
      array[i].state = 'default';
    }
    
    // Change count[i] so that count[i] contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
      
      animations.push({
        array: JSON.parse(JSON.stringify(array)),
        comparisons,
        swaps,
        description: `Calculating cumulative count for digit ${i}: ${count[i]}`
      });
    }
    
    // Build the output array
    const output = new Array(n).fill(null).map(() => ({ value: 0, state: 'default' }));
    
    // Place elements in sorted order
    for (let i = n - 1; i >= 0; i--) {
      array[i].state = 'active';
      
      const digit = Math.floor(array[i].value / exp) % 10;
      const index = count[digit] - 1;
      output[index] = { value: array[i].value, state: 'default' };
      count[digit]--;
      
      swaps++;
      
      // Create a copy of the array for animation
      const animationArray = array.map((el, idx) => {
        if (idx === i) return { ...el, state: 'active' };
        return { ...el, state: 'default' };
      });
      
      // Replace elements that have been placed in output
      for (let j = 0; j < n; j++) {
        if (output[j] && output[j].value !== 0) {
          animationArray[j] = { ...output[j] };
        }
      }
      
      animations.push({
        array: JSON.parse(JSON.stringify(animationArray)),
        comparisons,
        swaps,
        description: `Placing value ${array[i].value} (digit ${digit}) at index ${index}`
      });
      
      array[i].state = 'default';
    }
    
    // Copy the output array to the original array
    for (let i = 0; i < n; i++) {
      array[i] = { ...output[i] };
    }
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Completed sorting by digit position: ${exp}`
    });
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    array[i].state = 'sorted';
  }
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Heap Sort
export const heapSort = (inputArray: ArrayElement[]): SortingAnimation[] => {
  const array = JSON.parse(JSON.stringify(inputArray));
  const animations: SortingAnimation[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  const heapify = (arr: ArrayElement[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    arr[i].state = 'active';
    
    if (left < n) {
      arr[left].state = 'comparing';
      comparisons++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Comparing parent at index ${i} with left child at index ${left}`
      });
      
      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
      
      arr[left].state = 'default';
    }
    
    if (right < n) {
      arr[right].state = 'comparing';
      comparisons++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Comparing parent at index ${i} with right child at index ${right}`
      });
      
      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
      
      arr[right].state = 'default';
    }
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      
      animations.push({
        array: JSON.parse(JSON.stringify(arr)),
        comparisons,
        swaps,
        description: `Swapping elements at indices ${i} and ${largest}`
      });
      
      arr[i].state = 'default';
      
      heapify(arr, n, largest);
    } else {
      arr[i].state = 'default';
    }
  };
  
  // Build heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i);
  }
  
  // Extract elements from heap
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    swaps++;
    
    array[i].state = 'sorted';
    
    animations.push({
      array: JSON.parse(JSON.stringify(array)),
      comparisons,
      swaps,
      description: `Moving largest element to index ${i}`
    });
    
    heapify(array, i, 0);
  }
  
  array[0].state = 'sorted';
  
  animations.push({
    array: JSON.parse(JSON.stringify(array)),
    comparisons,
    swaps,
    description: 'Sorting complete'
  });
  
  return animations;
};

// Algorithm metadata
export const algorithms = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    function: bubbleSort,
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    function: selectionSort,
    description: 'A simple comparison-based algorithm that divides the input list into a sorted and an unsorted region, and repeatedly selects the smallest element from the unsorted region and moves it to the sorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    function: insertionSort,
    description: 'A simple comparison-based algorithm that builds the final sorted array one item at a time, by taking elements from the unsorted part and inserting them into their correct position in the sorted part.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    function: quickSort,
    description: 'An efficient, divide-and-conquer, comparison-based algorithm that selects a pivot element and partitions the array around the pivot.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    function: mergeSort,
    description: 'An efficient, divide-and-conquer, comparison-based algorithm that divides the unsorted list into n sublists, each containing one element, and then repeatedly merges sublists to produce new sorted sublists.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    function: heapSort,
    description: 'A comparison-based algorithm that uses a binary heap data structure to build a heap from the input data and then sorts the data by repeatedly extracting the largest element.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'shell',
    name: 'Shell Sort',
    function: shellSort,
    description: 'An in-place comparison sort that generalizes insertion sort by allowing the exchange of items that are far apart. The method starts by sorting pairs of elements far apart from each other, then progressively reducing the gap between elements to be compared.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'counting',
    name: 'Counting Sort',
    function: countingSort,
    description: 'A non-comparison-based sorting algorithm that works by counting the number of objects that have each distinct key value, and using arithmetic to determine the positions of each key value in the output sequence.',
    timeComplexity: {
      best: 'O(n+k)',
      average: 'O(n+k)',
      worst: 'O(n+k)'
    },
    spaceComplexity: 'O(n+k)',
    stable: true,
    type: 'non-comparison'
  },
  {
    id: 'radix',
    name: 'Radix Sort',
    function: radixSort,
    description: 'A non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits which share the same significant position and value.',
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)'
    },
    spaceComplexity: 'O(n+k)',
    stable: true,
    type: 'non-comparison'
  },
  {
    id: 'bucket',
    name: 'Bucket Sort',
    function: bucketSort,
    description: 'A distribution sort that works by distributing the elements into a number of buckets, then sorting each bucket individually, either using a different sorting algorithm or by recursively applying bucket sort.',
    timeComplexity: {
      best: 'O(n+k)',
      average: 'O(n+k)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(n+k)',
    stable: true,
    type: 'non-comparison'
  },
  {
    id: 'cocktail',
    name: 'Cocktail Shaker Sort',
    function: cocktailShakerSort,
    description: 'A variation of bubble sort that sorts in both directions on each pass through the list. This sorting algorithm is only marginally more difficult to implement than bubble sort, and solves the problem of turtles in bubble sort.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'comb',
    name: 'Comb Sort',
    function: combSort,
    description: 'An improvement over bubble sort. The basic idea is to eliminate turtles, or small values near the end of the list, since in a bubble sort these slow the sorting down tremendously. It differs from bubble sort by using a gap sequence.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n²/2^p)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'cycle',
    name: 'Cycle Sort',
    function: cycleSort,
    description: 'An in-place, unstable sorting algorithm that minimizes the number of memory writes. It is optimal in terms of the number of memory writes and is based on the idea that the permutation to be sorted can be factored into cycles.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  },
  {
    id: 'gnome',
    name: 'Gnome Sort',
    function: gnomeSort,
    description: 'A simple sorting algorithm similar to insertion sort but moving elements to their proper position by a series of swaps, similar to the way a garden gnome sorts a line of flower pots.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'tim',
    name: 'Tim Sort',
    function: timSort,
    description: 'A hybrid stable sorting algorithm derived from merge sort and insertion sort. It uses the insertion sort for small pieces of the array and then merges these sorted pieces using a merge sort.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    type: 'comparison'
  },
  {
    id: 'bogo',
    name: 'Bogo Sort',
    function: bogoSort,
    description: 'A highly inefficient sorting algorithm based on randomly generating permutations of the input until finding one that is sorted. Used primarily as an educational example of an extremely inefficient algorithm.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n × n!)',
      worst: 'O(∞)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    type: 'comparison'
  }
];