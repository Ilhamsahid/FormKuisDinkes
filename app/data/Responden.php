<?php

class Responden {
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getAllRespondent()
    {
        $data = [];

        $query = 'SELECT * FROM tb_responden ORDER BY id DESC';
        $result = $this->conn->query($query);

        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }

        return $data;
    }

    public function insertResponden($data)
    {
        $sql = "INSERT INTO tb_responden (responden, umur, kelamin, lulusan, jenis_pelayanan, tanggal_terakhir_kali, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?)";

        $stmt = $this->conn->prepare($sql);

        if(!$stmt){
            return false;
        }

        $stmt->bind_param('sisssss',
            $data['responden'],
            $data['umur'],
            $data['kelamin'],
            $data['lulusan'],
            $data['jenis_pelayanan'],
            $data['tanggal_terakhir_kali'],
            $data['tanggal'],
        );

        if($stmt->execute()){
            return $this->conn->insert_id;
        }

        $stmt->close();

        return False;
    }

    public function updateResponden($data, $id)
    {
        $sql = "UPDATE tb_responden
                SET responden = ?,
                    umur = ?,
                    kelamin = ?,
                    lulusan = ?,
                    jenis_pelayanan = ?,
                    tanggal_terakhir_kali = ?,
                    tanggal = ?
                WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        if(!$stmt){
            return false;
        }

        $stmt->bind_param(
            'sisssssi',
            $data['responden'],
            $data['umur'],
            $data['kelamin'],
            $data['lulusan'],
            $data['jenis_pelayanan'],
            $data['tanggal_terakhir_kali'],
            $data['tanggal'],
            $id
        );

        if($stmt->execute()){
            return true;
        }

        $stmt->close();
        return false;
    }

    public function deleteResponden($id)
    {
        $sql = "DELETE FROM tb_responden WHERE id = ?";

        $stmt = $this->conn->prepare($sql);

        if (!$stmt) {
            return false;
        }

        $stmt->bind_param('i', $id);

        if ($stmt->execute()) {
            return true;
        }

        $stmt->close();
        return false;
    }

}
