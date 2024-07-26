class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx].distance >= this.heap[parentIdx].distance) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      let idx = 0;
      const length = this.heap.length;
      while (true) {
        let leftIdx = 2 * idx + 1,
          rightIdx = 2 * idx + 2,
          swap = null;
        if (
          leftIdx < length &&
          this.heap[leftIdx].distance < this.heap[idx].distance
        )
          swap = leftIdx;
        if (
          rightIdx < length &&
          this.heap[rightIdx].distance <
            (swap === null
              ? this.heap[idx].distance
              : this.heap[leftIdx].distance)
        )
          swap = rightIdx;
        if (swap === null) break;
        [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
        idx = swap;
      }
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const dijkstra = (graph, source) => {
  const distances = {};
  for (const vertex in graph) distances[vertex] = Infinity;
  distances[source] = 0;

  const priorityQueue = new MinHeap();
  priorityQueue.insert({ vertex: source, distance: 0 });

  while (!priorityQueue.isEmpty()) {
    const { vertex: currentVertex, distance: currentDistance } =
      priorityQueue.extractMin();
    for (const neighbor in graph[currentVertex]) {
      const distance = currentDistance + graph[currentVertex][neighbor];
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        priorityQueue.insert({ vertex: neighbor, distance: distance });
      }
    }
  }

  return distances;
};
const graph = {
  0: { 1: 4, 2: 1 },
  1: { 3: 1 },
  2: { 1: 2, 3: 5 },
  3: {},
};
const source = 0;
const result = dijkstra(graph, source);
console.log(`Shortest distance from vertex ${source}`);
for (const vertex in result) {
  console.log(`vertex ${result[vertex]}`);
}
