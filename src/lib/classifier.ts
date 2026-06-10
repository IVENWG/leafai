import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import type { LeafCategoryKey } from './constants';

class LeafClassifier {
  private mobilenetModel: mobilenet.MobileNet | null = null;
  private knn: knnClassifier.KNNClassifier | null = null;
  private loading = false;

  async loadModel(onProgress?: (msg: string) => void): Promise<void> {
    if (this.mobilenetModel && this.knn) return;
    if (this.loading) return;
    this.loading = true;
    try {
      onProgress?.('正在加载AI大脑...');
      await tf.ready();
      onProgress?.('正在加载图像识别模型...');
      this.mobilenetModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      this.knn = knnClassifier.create();
      onProgress?.('AI准备就绪！');
    } finally {
      this.loading = false;
    }
  }

  isReady(): boolean {
    return this.mobilenetModel !== null && this.knn !== null;
  }

  private getInternalModel(): { mobilenetModel: mobilenet.MobileNet; knn: knnClassifier.KNNClassifier } {
    if (!this.mobilenetModel || !this.knn) {
      throw new Error('Model not loaded. Call loadModel() first.');
    }
    return { mobilenetModel: this.mobilenetModel, knn: this.knn };
  }

  async addExample(imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, label: LeafCategoryKey): Promise<void> {
    const { mobilenetModel, knn } = this.getInternalModel();
    const activation = mobilenetModel.infer(imageElement, true) as tf.Tensor;
    knn.addExample(activation, label);
  }

  async predict(imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): Promise<{
    label: string;
    confidences: Record<string, number>;
  } | null> {
    const { mobilenetModel, knn } = this.getInternalModel();
    const numClasses = knn.getNumClasses();
    if (numClasses === 0) return null;

    const activation = mobilenetModel.infer(imageElement, true) as tf.Tensor;
    const result = await knn.predictClass(activation);
    activation.dispose();

    if (result.label === '' || result.confidences === undefined) {
      return null;
    }

    return {
      label: result.label,
      confidences: result.confidences as Record<string, number>,
    };
  }

  getClassCounts(): Record<string, number> {
    if (!this.knn) return {};
    const counts: Record<string, number> = {};
    const dataset = this.knn.getClassifierDataset();
    if (dataset) {
      for (const key of Object.keys(dataset)) {
        const tensor = dataset[key];
        if (tensor) {
          counts[key] = tensor.shape[0];
        }
      }
    }
    return counts;
  }

  hasEnoughSamples(minPerClass: number = 5): boolean {
    const counts = this.getClassCounts();
    const categories: LeafCategoryKey[] = ['long_leaf', 'round_leaf', 'tooth_leaf', 'big_leaf'];
    return categories.every(c => (counts[c] || 0) >= minPerClass);
  }

  clearAll(): void {
    if (this.knn) {
      this.knn.clearAllClasses();
    }
  }

  dispose(): void {
    this.knn?.dispose();
    this.mobilenetModel = null;
    this.knn = null;
  }
}

export const classifier = new LeafClassifier();
