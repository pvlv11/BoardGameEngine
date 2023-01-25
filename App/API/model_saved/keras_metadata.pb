
�Jroot"_tf_keras_network*�I{"name": "model", "trainable": true, "expects_training_arg": true, "dtype": "float32", "batch_input_shape": null, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Functional", "config": {"name": "model", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_1"}, "name": "input_1", "inbound_nodes": []}, {"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_2"}, "name": "input_2", "inbound_nodes": []}, {"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding", "inbound_nodes": [[["input_1", 0, 0, {}]]]}, {"class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_1", "inbound_nodes": [[["input_2", 0, 0, {}]]]}, {"class_name": "Dot", "config": {"name": "dot", "trainable": true, "dtype": "float32", "axes": 2, "normalize": false}, "name": "dot", "inbound_nodes": [[["embedding", 0, 0, {}], ["embedding_1", 0, 0, {}]]]}, {"class_name": "Embedding", "config": {"name": "embedding_2", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 1, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_2", "inbound_nodes": [[["input_1", 0, 0, {}]]]}, {"class_name": "Embedding", "config": {"name": "embedding_3", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_3", "inbound_nodes": [[["input_2", 0, 0, {}]]]}, {"class_name": "Add", "config": {"name": "add", "trainable": true, "dtype": "float32"}, "name": "add", "inbound_nodes": [[["dot", 0, 0, {}], ["embedding_2", 0, 0, {}], ["embedding_3", 0, 0, {}]]]}, {"class_name": "Flatten", "config": {"name": "flatten", "trainable": true, "dtype": "float32", "data_format": "channels_last"}, "name": "flatten", "inbound_nodes": [[["add", 0, 0, {}]]]}], "input_layers": [["input_1", 0, 0], ["input_2", 0, 0]], "output_layers": [["flatten", 0, 0]]}, "shared_object_id": 17, "input_spec": [{"class_name": "InputSpec", "config": {"dtype": null, "shape": {"class_name": "__tuple__", "items": [null, 1]}, "ndim": 2, "max_ndim": null, "min_ndim": null, "axes": {}}}, {"class_name": "InputSpec", "config": {"dtype": null, "shape": {"class_name": "__tuple__", "items": [null, 1]}, "ndim": 2, "max_ndim": null, "min_ndim": null, "axes": {}}}], "build_input_shape": [{"class_name": "TensorShape", "items": [null, 1]}, {"class_name": "TensorShape", "items": [null, 1]}], "is_graph_network": true, "full_save_spec": {"class_name": "__tuple__", "items": [[[{"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null, 1]}, "float32", "input_1"]}, {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null, 1]}, "float32", "input_2"]}]], {}]}, "save_spec": [{"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null, 1]}, "float32", "input_1"]}, {"class_name": "TypeSpec", "type_spec": "tf.TensorSpec", "serialized": [{"class_name": "TensorShape", "items": [null, 1]}, "float32", "input_2"]}], "keras_version": "2.11.0", "backend": "tensorflow", "model_config": {"class_name": "Functional", "config": {"name": "model", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_1"}, "name": "input_1", "inbound_nodes": [], "shared_object_id": 0}, {"class_name": "InputLayer", "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_2"}, "name": "input_2", "inbound_nodes": [], "shared_object_id": 1}, {"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 2}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 3}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding", "inbound_nodes": [[["input_1", 0, 0, {}]]], "shared_object_id": 4}, {"class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 5}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 6}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_1", "inbound_nodes": [[["input_2", 0, 0, {}]]], "shared_object_id": 7}, {"class_name": "Dot", "config": {"name": "dot", "trainable": true, "dtype": "float32", "axes": 2, "normalize": false}, "name": "dot", "inbound_nodes": [[["embedding", 0, 0, {}], ["embedding_1", 0, 0, {}]]], "shared_object_id": 8}, {"class_name": "Embedding", "config": {"name": "embedding_2", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 1, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 9}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 10}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_2", "inbound_nodes": [[["input_1", 0, 0, {}]]], "shared_object_id": 11}, {"class_name": "Embedding", "config": {"name": "embedding_3", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 12}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 13}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "name": "embedding_3", "inbound_nodes": [[["input_2", 0, 0, {}]]], "shared_object_id": 14}, {"class_name": "Add", "config": {"name": "add", "trainable": true, "dtype": "float32"}, "name": "add", "inbound_nodes": [[["dot", 0, 0, {}], ["embedding_2", 0, 0, {}], ["embedding_3", 0, 0, {}]]], "shared_object_id": 15}, {"class_name": "Flatten", "config": {"name": "flatten", "trainable": true, "dtype": "float32", "data_format": "channels_last"}, "name": "flatten", "inbound_nodes": [[["add", 0, 0, {}]]], "shared_object_id": 16}], "input_layers": [["input_1", 0, 0], ["input_2", 0, 0]], "output_layers": [["flatten", 0, 0]]}}, "training_config": {"loss": "mean_squared_error", "metrics": [[{"class_name": "MeanMetricWrapper", "config": {"name": "mse", "dtype": "float32", "fn": "mean_squared_error"}, "shared_object_id": 20}]], "weighted_metrics": null, "loss_weights": null, "optimizer_config": {"class_name": "SGD", "config": {"name": "SGD", "learning_rate": 9.999999747378752e-05, "decay": 0.0, "momentum": 0.8999999761581421, "nesterov": false}}}}2
�root.layer-0"_tf_keras_input_layer*�{"class_name": "InputLayer", "name": "input_1", "dtype": "float32", "sparse": false, "ragged": false, "batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_1"}}2
�root.layer-1"_tf_keras_input_layer*�{"class_name": "InputLayer", "name": "input_2", "dtype": "float32", "sparse": false, "ragged": false, "batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "config": {"batch_input_shape": {"class_name": "__tuple__", "items": [null, 1]}, "dtype": "float32", "sparse": false, "ragged": false, "name": "input_2"}}2
�root.layer_with_weights-0"_tf_keras_layer*�{"name": "embedding", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 2}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 3}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "inbound_nodes": [[["input_1", 0, 0, {}]]], "shared_object_id": 4, "build_input_shape": {"class_name": "TensorShape", "items": [null, 1]}}2
�root.layer_with_weights-1"_tf_keras_layer*�{"name": "embedding_1", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding_1", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 5}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 6}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "inbound_nodes": [[["input_2", 0, 0, {}]]], "shared_object_id": 7, "build_input_shape": {"class_name": "TensorShape", "items": [null, 1]}}2
�root.layer-4"_tf_keras_layer*�{"name": "dot", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "Dot", "config": {"name": "dot", "trainable": true, "dtype": "float32", "axes": 2, "normalize": false}, "inbound_nodes": [[["embedding", 0, 0, {}], ["embedding_1", 0, 0, {}]]], "shared_object_id": 8, "build_input_shape": [{"class_name": "TensorShape", "items": [null, 1, 10]}, {"class_name": "TensorShape", "items": [null, 1, 10]}]}2
�root.layer_with_weights-2"_tf_keras_layer*�{"name": "embedding_2", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding_2", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 60839, "output_dim": 1, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 9}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 10}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "inbound_nodes": [[["input_1", 0, 0, {}]]], "shared_object_id": 11, "build_input_shape": {"class_name": "TensorShape", "items": [null, 1]}}2
�root.layer_with_weights-3"_tf_keras_layer*�{"name": "embedding_3", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": false, "class_name": "Embedding", "config": {"name": "embedding_3", "trainable": true, "dtype": "float32", "batch_input_shape": {"class_name": "__tuple__", "items": [null, null]}, "input_dim": 307306, "output_dim": 10, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}, "shared_object_id": 12}, "embeddings_regularizer": {"class_name": "L2", "config": {"l2": 0.009999999776482582}, "shared_object_id": 13}, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": null}, "inbound_nodes": [[["input_2", 0, 0, {}]]], "shared_object_id": 14, "build_input_shape": {"class_name": "TensorShape", "items": [null, 1]}}2
�root.layer-7"_tf_keras_layer*�{"name": "add", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "Add", "config": {"name": "add", "trainable": true, "dtype": "float32"}, "inbound_nodes": [[["dot", 0, 0, {}], ["embedding_2", 0, 0, {}], ["embedding_3", 0, 0, {}]]], "shared_object_id": 15, "build_input_shape": [{"class_name": "TensorShape", "items": [null, 1, 1]}, {"class_name": "TensorShape", "items": [null, 1, 1]}, {"class_name": "TensorShape", "items": [null, 1, 10]}]}2
�	root.layer-8"_tf_keras_layer*�{"name": "flatten", "trainable": true, "expects_training_arg": false, "dtype": "float32", "batch_input_shape": null, "stateful": false, "must_restore_from_config": false, "preserve_input_structure_in_config": false, "autocast": true, "class_name": "Flatten", "config": {"name": "flatten", "trainable": true, "dtype": "float32", "data_format": "channels_last"}, "inbound_nodes": [[["add", 0, 0, {}]]], "shared_object_id": 16, "input_spec": {"class_name": "InputSpec", "config": {"dtype": null, "shape": null, "ndim": null, "max_ndim": null, "min_ndim": 1, "axes": {}}, "shared_object_id": 21}}2
��root.keras_api.metrics.0"_tf_keras_metric*�{"class_name": "Mean", "name": "loss", "dtype": "float32", "config": {"name": "loss", "dtype": "float32"}, "shared_object_id": 22}2
��root.keras_api.metrics.1"_tf_keras_metric*�{"class_name": "MeanMetricWrapper", "name": "mse", "dtype": "float32", "config": {"name": "mse", "dtype": "float32", "fn": "mean_squared_error"}, "shared_object_id": 20}2