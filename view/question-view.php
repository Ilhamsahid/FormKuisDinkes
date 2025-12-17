<div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        <?php
            foreach ($questions as $key => $value) {
                ?>
                <div class="rounded-lg border border-gray-300 p-4">
                    <p class="mb-3 text-sm font-medium text-gray-700"><?= $key+1 ?>. <?= $value['pertanyaan'] ?></p>
                    <div class="flex justify-between text-sm">
                        <?php
                        $q = $key + 1;
                        ?>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="<?= $q ?>" value="1"> Sangat Tidak sesuai
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="<?= $q ?>" value="2"> Tidak Sesuai
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="<?= $q ?>" value="3"> Cukup
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" name="<?= $q ?>" value="4"> Puas
                        </label>
                    </div>
                </div>
                <?php
            }
        ?>
    </div>
    <div class="flex gap-3 mt-4">
    <button
        type="button"
        onclick="prevStep()"
        class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700
                hover:bg-gray-100 transition"
    >
        ← Kembali
    </button>

    <button
        type="submit"
        class="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white
                hover:bg-blue-700 transition"
    >
        Kirim →
    </button>
</div>
</div>
