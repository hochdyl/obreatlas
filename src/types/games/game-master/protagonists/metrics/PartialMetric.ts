type PartialMetric = Omit<Metric, 'id'> & { id: number | null }