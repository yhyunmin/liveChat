const Chat = (Sequelize, DataTypes) => {
  return Sequelize.define(
      "chat",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        userid: {
          // name VARCHAR(20) NOT NULL,
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        pw: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      {
        tableName: "chat", // 실제 테이블 명
        freezeTableName: true, // 테이블명 고정 !
        timestamps: false, // 데이터가 추가/수정되는 시간을 컬럼으로 만들어서 기록
      }
  );
};

module.exports = Chat;
